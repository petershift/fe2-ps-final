import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/Review';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit {
  review: Review;
  id: string;
  reviews: Review[];
  formEnabled: boolean;

  back() {
    window.history.back()
  }

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
    this.formEnabled = false;
  }
  toggleForm(){
    this.formEnabled = !this.formEnabled;
  }
  async editReview(){
    console.log(this.review)
    const response = await this.dataService.putReview(this.review)
    this.toggleForm();
  }
  async ngOnInit() {
    const response = await this.dataService.getReview(this.id)
    this.review = response.json()
    this.toggleForm();
  }

 

}
