import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


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
  add: boolean;
  

  constructor(public dataService: DataService) { 
    this.pageTitle = "Recipes";
    this.add = true;
    // this.recipes = this.dataService.getRecipes();
  }
  addOne(){
    this.add = !this.add;
  }
  async addRecipe(form: NgForm){
    const response =  await this.dataService.addRecipe(form.value)
  }

  async ngOnInit() {
    const response = await this.dataService.getRecipes()
    this.recipes = response.json()
  }

}
