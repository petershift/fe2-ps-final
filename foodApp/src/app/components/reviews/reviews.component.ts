import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/Review';
import { DataService } from '../../service/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  pageTitle: string;
  reviews: object[];
  add: boolean;

  constructor(public dataService: DataService) {
    this.add = true;
  }
  
  addOne(){
    this.add = !this.add;
  } 
  async addReview(form: NgForm){
    const response =  await this.dataService.addReview(form.value)
  }

  async ngOnInit() {
    const response = await this.dataService.getReviews()
    this.reviews = response.json()
  }

}
