# Session 9 - Angular

## Homework

Using the notes from session 7 where we created our API - set the foodapp project to request information from *your* database on mLab.

Remember, to seed your database you can use the `api/import` endpoint.

We will need to do this before we can start sending post / delete / etc. requests.

## FoodApp

Create a new angular project

`ng new foodapp`

cd into the foodapp directory

Generate components

`ng generate component components/recipes`

`ng generate component components/recipe-detail`

and a service

`ng generate service service/data`

Create a second tab in the terminal and run:

`npm run start`

Examine `app.module.ts` - note lack of a service

app.component.html:

```html
<div class="wrap">
    <app-recipes></app-recipes>
</div>
```

## Recipes Component

Add:

`pageTitle: string;` to the class and `this.pageTitle = 'Recipes'` to the constructor:

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

pageTitle: string;

constructor() {
  this.pageTitle = 'Recipes'
}

ngOnInit() {
}

}
```

In the template:

```html
<div class="wrap recipes">
  <h1>{{ pageTitle }}</h1>
</div>
```

Add css from the assets folder

Add data to recipes constructor:

```js
this.recipes = [
  {
    "name": "recipe1309",
    "title": "Lasagna",
    "date": "2013-09-01",
    "description": "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.",
    "image": "lasagne.png"
  },
  {
    "name": "recipe1404",
    "title": "Pho-Chicken Noodle Soup",
    "date": "2014-04-15",
    "description": "Pho (pronounced \"fuh\") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.",
    "image": "pho.png"
  },

  {
    "name": "recipe1210",
    "title": "Guacamole",
    "date": "2016-10-01",
    "description": "Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.",
    "image": "guacamole.png"
  },

  {
    "name": "recipe1810",
    "title": "Hamburger",
    "date": "2012-10-20",
    "description": "A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.",
    "image": "hamburger.png"
  }
]
```

Set the types in the class:

`recipes: object[]`

```js
recipe: {
  name: string
  title: string
  date: string
  description: string
  image: string
}
```

Build out the html

```html
<div class="wrap recipes">
  <h1>{{ pageTitle }}</h1>

  <ul>
    <li *ngFor="let recipe of recipes">
      <img src="assets/home/{{recipe.image}}" />
      <div>
        <h2>
          <a href="/recipe">{{recipe.title}}</a>
        </h2>
        <p>{{recipe.description}}</p>
      </div>
    </li>
  </ul>
</div>
```

Add image assets to the project (need to restart Webpack in order for it to load the images)

Adjust the css:

```css
.wrap ul {
    list-style: none;
    padding: 0;
}

.wrap li {
    display: flex;
    padding: 1rem;
}

.wrap li img {
    width: 30%;
    height: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    margin-right: 1rem;
    background-color: #fff;
    box-shadow: 2px 2px 4px #ccc;
}

.wrap li a {
    color: #7e360d;
    text-decoration: none;
}
```

## Routing

Add the router module - app.module:

```js
import { RouterModule, Routes } from '@angular/router';

...

const appRoutes: Routes = [
  { path: '', component: RecipesComponent, pathMatch: 'full' },
  { path: 'recipe', component: RecipeDetailComponent }
]

...

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],

...

```

And in the html

```html
<div class="wrap">
  <router-outlet></router-outlet>
</div>
```

Test at `http://localhost:4200/recipe`

## Recipe-detail component

```html
<button (click)="back()">Back</button>
```

```js
back() {
  window.history.back()
}
```

Go to `http://localhost:4200/recipe` and test.

We are going to be sharing data and functionality across components.

Create a model, `Recipe.ts`, in a new models folder in `src`.

```js
 export interface Recipe {
 	name: string;
 	title: string;
 	date: string;
 	description: string;
 	image: string;
 }
```

Use it in our recipes and recipe-detail components.

Import it:

`import { Recipe } from '../../models/Recipe';`

And add it to the class:

`recipe: Recipe;`

Move the data into the service

1. register / add the service to app.module
1. import the service into the recipes templates

In app.module:

```js
import { DataService } from './service/data.service'
...
  providers: [DataService],
```

Add param

```js
const appRoutes: Routes = [
  { path: '', component: RecipesComponent, pathMatch: 'full' },
  { path: 'recipe/:id', component: RecipeDetailComponent }
]
```

Ammend the recipes template:

```html
<a href="recipe/{{recipe.name}}">{{recipe.title}}</a>
```

Add / make it available to the recipes and recipe-detail components:

`import { DataService } from '../../service/data.service';`

## Service

Add the model to the service:

`import { Recipe } from '../models/Recipe';`

`recipes: Recipe[]`

```js
constructor() {
  this.recipes = [
    {
      "name": "recipe1309",
      "title": "Lasagna",
      "date": "2013-09-01",
      "description": "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.",
      "image": "lasagne.png"
    },
    {
      "name": "recipe1404",
      "title": "Pho-Chicken Noodle Soup",
      "date": "2014-04-15",
      "description": "Pho (pronounced \"fuh\") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.",
      "image": "pho.png"
    },

    {
      "name": "recipe1210",
      "title": "Guacamole",
      "date": "2016-10-01",
      "description": "Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.",
      "image": "guacamole.png"
    },

    {
      "name": "recipe1810",
      "title": "Hamburger",
      "date": "2012-10-20",
      "description": "A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.",
      "image": "hamburger.png"
    }
  ]
}
```

Remove the data from the recipes.component and call a function from the service to retrieve them:

```js
  constructor(public dataService: DataService) {
    this.pageTitle = 'Recipes'
    this.recipes = this.dataService.getRecipes()
  }
```

## A note on `public`

Constructors define which parameters to provide when instantiate your objects. In TypeScript, you can also add modifiers like private or public to define, at the same time, class properties and set their values with the provided ones.

e.g.:

```js
class Car {
  constructor(private engine:string, private tires:string, private doors:number){
  }
}
```

Is similar to:

```js
class Car {
  constructor(engine:string, tires:string, doors:number){
    this.engine = engine;
    this.tires = tires;
    this.doors = doors;
  }
}
```

By simply prefixing the constructor arg with the word private (or public or readonly) it automatically creates the property and initializes it from the constructor arguments.

## Service cont

Add the function to the service:

```js
getRecipes() {
  return this.recipes;
}
```

Get the display into in recipe-detail - we're going to have to access the url params.

```js
import { Router, ActivatedRoute, Params } from '@angular/router';

...

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
    this.recipe = dataService.getRecipe(this.id)
  }
```

in the service:

```js
getRecipe(id) {
  this.recipe = this.recipes.filter(recipe => recipe.name == id)[0]
  return this.recipe;
}
```

recipe-detail html:

```html
<h1>{{ recipe.title }}</h1>
<img style="width: 30%" src="assets/home/{{recipe.image}}" />
<p>{{ recipe.description }}</p>
<button (click)="back()">Back</button>
```

## HTTP Service

We are going to get the data from an API using Http ($http in Angular 1).

*Deploy the api using the backend assets in the zip file.*

1. unzip
1. npm install
1. `npm run start` the api in backend
1. test at the get api endpoint `http://localhost:3006/`

add http service to app.module

```js
import { HttpModule } from '@angular/http';

...

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
```

Now that its added to our app we can use it in the service:

```js
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'
...

  constructor(private http: Http) {
  }

...

getRecipes() {
  return this.http.get('http://localhost:3006/api/recipe').toPromise()
}
```

By default, Angular uses `observables` [link](http://jsclass.jcoglan.com/observable.html) to publish and subscribe to data feeds. Here I am circumventing this in favor of `async / await` [link](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9).

Review the documents in assets/async-await. There are some additional examples [on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

## API

note the app.use headers in app.js. Uncomment these lines

 in recipes.component

```js
  async ngOnInit() {
    const response = await this.dataService.getRecipes()
    this.recipes = response.json()
  }
```

In recipe-detail component:

```js
  async ngOnInit() {
    const response = await this.dataService.getRecipe(this.id)
    this.recipe = response.json()
  }
```

in recipes-detail.component

```js
  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
  }
```

in service:

`import { Router, ActivatedRoute, Params } from '@angular/router';`

```js
id: string;
recipe: Recipe;
recipes: Recipe[]
```

```js
getRecipe(id) {
  return this.http.get('http://localhost:3006/api/recipe/' + id).toPromise()
}
```

```js
constructor(private http: Http) {
}
```

Ammend the link in recipes template:

```js
<h2>
  <a href="recipe/{{recipe._id}}">{{recipe.title}}</a>
</h2>

```

Safe operator?

`<h1>{{ recipe?.title }}</h1>`




























