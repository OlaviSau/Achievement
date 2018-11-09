import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  categories = [
    {
      name: 'Literature'
    },
    {
      name: 'Travel'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
