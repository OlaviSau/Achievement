import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ad-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  categories = [
    {
      name: 'Literature',
      key: 'literature'
    },
    {
      name: 'Travel',
      key: 'travel'
    },
    {
      name: 'Travel',
      key: 'travel'
    },
    {
      name: 'Travel',
      key: 'travel'
    },
    {
      name: 'Travel',
      key: 'travel'
    },
    {
      name: 'Travel',
      key: 'travel'
    },
    {
      name: 'Travel',
      key: 'travel'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
