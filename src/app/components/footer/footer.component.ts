import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  now: Date = new Date();
  get year() { return this.now.getFullYear(); }

  constructor() { }

  ngOnInit(): void {
  }

}
