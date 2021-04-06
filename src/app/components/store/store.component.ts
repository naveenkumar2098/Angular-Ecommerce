import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  filter: string = '';
  field: string = 'all';
  sortable: string = '';
  filtered: boolean = false;

  products: Product[] = [];
  categories: Category[] = [];
  category: string = 'All products';

  pages: number;
  pageNumber: number = 1;
  paginating: boolean = true;

  featured: Product[] = [];
  searching: boolean = false;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.subscribeProductData();
    this.paginate();
    this.categoriesService.listAll().subscribe((data: Category[]) =>
      this.categories = data);
    this.subscribeFeatured();
  }

  subscribeProductData(): void {
    this.productsService.listAll().subscribe((data: Product[]) => {
      this.products = data;
      this.pages = this.numberOfPages(this.products.length);
    });
  }

  paginate() {
    this.productsService.listPagination(1).subscribe(data => this.products = data);
  }

  subscribeFeatured() {
    this.productsService.listFeatured().subscribe((data: Product[]) =>
      this.featured = data.filter(data => data.featured === true));
  }

  numberOfPages(productsLength: number): number {
    return Math.ceil(productsLength / 12);
  }

  changePage(pageNumber: number, direction: string) {
    this.orderBy();
    window.scroll(0, 0);
    switch (direction) {
      case "previous":
        if (pageNumber - 1 >= 0) {
          this.pageNumber = pageNumber - 1;
          this.productsService.listPagination(this.pageNumber).subscribe(data => this.products = data);
          pageNumber === 1 ? this.searching = true : this.searching = false;
        } else pageNumber = 1;
        break;
      case "next":
        if (pageNumber < this.pages) {
          this.searching = true;
          this.pageNumber = pageNumber + 1;
          this.productsService.listPagination(this.pageNumber).subscribe(data => this.products = data);
        } else pageNumber = this.pages;
        break;
      default:
        return;
    }
  }

  activeFilters(): void {
    this.filtered = true;
    this.paginating = false;
  }

  clearFilters(): void {
    this.category = 'All products';
    this.subscribeProductData();
    this.paginate();
    this.pageNumber = 1;
    this.paginating = true;
    this.searching = false;
    this.filtered = false;
    this.filter = '';
    this.field = 'all';
    this.sortable = '';
  }

  searchByField(searchFilter: any): Product[] {
    this.category = 'All products';
    this.activeFilters();
    switch (searchFilter.field) {
      case "all":
        this.searchByFieldAux("name", searchFilter.filter);
        break;
      case "make":
        this.searchByFieldAux("make", searchFilter.filter);
        break;
      case "model":
        this.searchByFieldAux("model", searchFilter.filter);
        break;
      default:
        return [];
    }
  }
  searchByFieldAux(field: string, filter: any) {
    this.productsService.listAll().subscribe((data: Product[]) =>
      this.products = data.filter(data => data[field].toUpperCase().includes(filter.toUpperCase())));
    filter === '' ? this.clearFilters() : this.searching = true;
  }

  filterCategory(id: any): void {
    if (id === 0) this.clearFilters();
    else {
      this.activeFilters();
      this.productsService.listAll().subscribe((data: Product[]) =>
        this.products = data.filter(data => data.categoryId === id.category));
      this.category = this.categories[id.category - 1].name;
      this.searching = true;
    }
  }

  orderBy(): Product[] {
    this.searching = true;
    this.filtered === true ? this.paginating = false : this.paginating = true;
    switch (this.sortable) {
      case '':
        this.clearFilters();
        break;
      case 'makeAsc':
        this.orderByAux('make');
        break;
      case 'makeDsc':
        this.orderByAux('make', 'dsc');
        break;
      case 'modelAsc':
        this.orderByAux('model');
        break;
      case 'modelDsc':
        this.orderByAux('model', 'dsc');
        break;
      case 'priceAsc':
        this.orderByAux('price');
        break;
      case 'priceDsc':
        this.orderByAux('price', 'dsc');
        break;
      default:
        return [];
    }
  }
  orderByAux(field: string, sort: string = 'asc'): void {
    if (sort === "asc") this.products.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0));
    else this.products.sort((a, b) => (a[field] < b[field]) ? 1 : ((b[field] < a[field]) ? -1 : 0));
  }

  refreshStock(stock: number): void {
    this.subscribeProductData();
    this.subscribeFeatured();
  }

}