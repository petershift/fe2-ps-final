import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Recipe } from '../models/Recipe';

@Injectable()
  
export class DataService {

  recipes: Recipe[];
  recipe: Recipe;
  id: string;

  getRecipes() {
    return this.http.get('http://localhost:3006/api/recipe').toPromise();
  }

  getRecipe(id) {
    return this.http.get('http://localhost:3006/api/recipe/' + id).toPromise()
  }

  constructor(private http: Http) {
  }


}
