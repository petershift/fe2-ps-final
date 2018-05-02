import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../models/Recipe';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  pageTitle: string;
  recipes: object[];
  

  constructor(public dataService: DataService) { 
    this.pageTitle = "Recipes";
    // this.recipes = this.dataService.getRecipes();
  }

  async ngOnInit() {
    const response = await this.dataService.getRecipes()
    this.recipes = response.json()
  }

}
