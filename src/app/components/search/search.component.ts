import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchFilter: EventEmitter<any> = new EventEmitter();
  @Input() filter: string;
  @Input() field: string;

  // filter: string = '';
  // field: string = 'name';

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    this.searchFilter.emit({ 'filter': this.filter, 'field': this.field });
  }

  clear() {
    this.filter = '';
    this.field = 'all';
    this.search();
  }

}
