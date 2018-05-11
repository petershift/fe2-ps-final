import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  pageTitle: string;

  constructor() {
    this.pageTitle = "Galleria of Fine Wines";

   }

  ngOnInit() {
  }

}
