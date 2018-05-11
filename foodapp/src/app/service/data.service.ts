import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Recipe } from '../models/Recipe';
import { Review } from '../models/Review';

@Injectable()
  
export class DataService {

  recipes: Recipe[];
  recipe: Recipe;
  id: string;

  reviews: Review[];
  review: Review;
  
  getReviews() {
    return this.http.get('http://localhost:3006/api/review').toPromise();
  }
  getReview(id) {
    return this.http.get('http://localhost:3006/api/review/' + id).toPromise()
  }

  getRecipes() {
    return this.http.get('http://localhost:3006/api/recipe').toPromise();
  }
  deleteRecipe(recipe){
    return this.http.delete('http://localhost:3006/api/recipe/' + recipe._id).toPromise();
  }
  addRecipe(recipe){
    return this.http.post('http://localhost:3006/api/recipe/', recipe).toPromise();
  }
  addReview(review){
    return this.http.post('http://localhost:3006/api/review/', review).toPromise();
  }

  getRecipe(id) {
    return this.http.get('http://localhost:3006/api/recipe/' + id).toPromise()
  }
  putRecipe(recipe) {
    console.log('service ' + recipe)
    return this.http.put('http://localhost:3006/api/recipe/' + recipe._id, recipe).toPromise()
  }
  putReview(review) {
    console.log('service ' + review)
    return this.http.put('http://localhost:3006/api/review/' + review._id, review).toPromise()
  }

  constructor(private http: Http) {
  }


}
