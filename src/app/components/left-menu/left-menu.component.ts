import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  @Output() selectedCategory: EventEmitter<any> = new EventEmitter();

  categories: Category[] = [];
  category: number;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.listAll().subscribe((data: Category[]) => this.categories = data);
  }

  filterCategory(id: number) {
    if (id === 0) {
      this.selectedCategory.emit(id);
    } else {
      this.category = id;
      this.selectedCategory.emit({ "category": this.category, "name": this.categories[id - 1].name });
    }
  }

}
