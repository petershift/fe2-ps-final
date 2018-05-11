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

  async ngOnInit() {
    this.toggleForm();
    const response = await this.dataService.getRecipe(this.id)
    this.recipe = response.json()
  }
  async editRecipe(){
    console.log(this.recipe)
    const response = await this.dataService.putRecipe(this.recipe)
    this.toggleForm();
  }
  async deleteRecipe(){
    const response = await this.dataService.deleteRecipe(this.recipe)
    window.history.back();
  }

}
