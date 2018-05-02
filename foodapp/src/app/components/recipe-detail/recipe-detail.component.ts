import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../models/Recipe';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
  
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: string;
  recipes: Recipe[];

  back() {
    window.history.back()
  }

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
    // this.recipe = dataService.getRecipe(this.id)
  }

  async ngOnInit() {
    const response = await this.dataService.getRecipe(this.id)
    this.recipe = response.json()
  }

}
