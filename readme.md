# Session 10 - Angular

## Homework



## FoodApp

Note

Added apiUrl to data service

Added imageUrl to recipe-detail component

```
<div *ngIf="recipe">
  <h1> {{ recipe.title }}</h1>
  <img style="max-width: 30%" src="assets/home/{{ recipe.image }}" />
  <p>{{ recipe.description }}</p>
  <button (click)="back()">Back</button>
</div>
```

Importing the forms module in app.module:

```js
import { FormsModule } from '@angular/forms';

...

  imports: [
    ...
    BrowserModule,
    FormsModule
  ],
```

Review:

1: *html Binding  DOM > Component* works for any HTML attribute:

`<p [ngClass]="currentClasses">`

`<img [src]="vehicle.imageUrl">`

2: *Event Binding  DOM > Component* e.g. `ng-click`

In Angular 2 `(click)`

3: *Two Way Binding  DOM < > Component* e.g. `ng-model`. 

In Angular 2 we use hotdogs (or a football in a box):

`<input [(ngModel)]="name" />`

## ngIf conditions

```
  formEnabled: boolean;

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.formEnabled = true;
  }
```

```
<div *ngIf="!formEnabled">
  <div *ngIf="recipe">
    <h1> {{ recipe.title }}</h1>
    <img style="max-width: 30%" src="assets/home/{{ recipe.image }}" />
    <p>{{ recipe.description }}</p>
    <button (click)="back()">Back</button>
  </div>
</div>
```


```
  <div id="form-wrapper">
    <form action="#" method="post" > 
    
      <fieldset>

        <legend>Edit Recipe</legend>

        <ol>
          <li>
            <label for="name">Recipe Name</label>
            <input [(ngModel)]="recipe.title" type="text" name="name" required placeholder="Recipe Name" />

          </li>

          <li>
            <label for="image">Image</label>
            <input [(ngModel)]="recipe.image" type="text" name="image" required placeholder="Image Name" />
          </li>

          <li>
            <label for="description">Recipe Description</label> 
            <textarea [(ngModel)]="recipe.description" name="description" required></textarea>
          </li>

          <li>
            <input type="submit" value="Update Recipe" />
          </li>

        </ol>

      </fieldset>

    </form>
  </div>  
```

### Form CSS

* focus

```
*:focus{
  outline: none;
}

input:focus, 
textarea:focus {
  box-shadow: 0 0 25px #ccc;
  transform: scale(1.05);
}

input:not(:focus), 
textarea:not(:focus) {
  opacity: 0.5;
}
```

Native browser validation

* novalidate
* required, valid, invalid

```
input:required, 
textarea:required {
  background:url("/assets/asterisk_orange.png") no-repeat 280px 7px;  
}

input:valid, 
textarea:valid {
  background:url("/assets/tick.png") no-repeat 280px 5px;     
}

input:focus:invalid, 
textarea:focus:invalid {
  background:url("/assets/cancel.png") no-repeat 280px 7px;         
}
```

Input types

* text, email, website, number, range

```
input[type=submit] {
  color: #fff;
  padding: 10px;
  background: #007eb6;
  opacity: 1.0;
}

input[type="number"], 
input[type="number"]:required, 
input[type="number"]:valid, 
input[type="number"]:focus:invalid {
  background-position: 260px 7px; 
}
```

Placeholder text

```
::-webkit-input-placeholder {
   color: #aaa;
}
```

Add rudimentary feedback:

```html
<li>
  <label for="name">Recipe Name</label>
  <input 
  [(ngModel)]="recipe.title" 
  #recipeTitle="ngModel" 
  minlength="2" 
  type="text" 
  name="name" 
  required 
  placeholder="Recipe Name" />
</li>

<div *ngIf="recipeTitle.errors?.required && recipeTitle.touched" class="alert">Title is required</div>
<div *ngIf="recipeTitle.errors?.minlength && recipeTitle.touched" class="alert">Recipe title should be longer</div>
```

template

```
<form (submit)="editRecipe()">
```

recipe-detail.component

```
editRecipe(){
  console.log(this.recipe.title)
}
```

```
async editRecipe(){
  console.log(this.recipe)
  const response = await this.dataService.putRecipe(this.recipe)
}
```

app.js

```
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE")
  next()
})
```

Service

```
putRecipe(){
  console.log('service ' + recipe)
}
```

then

```
putRecipe(recipe) {
  console.log('service ' + recipe)
  return this.http.put('http://localhost:3006/api/recipe/' + recipe._id, recipe).toPromise()
}
```

set the formEnabled flag component

```
  async editRecipe(){
    console.log(this.recipe)
    const response = await this.dataService.putRecipe(this.recipe)
    this.formEnabled = false;
  }
```

Add Cancel button to the form that sets the formEnables flag to false

Add Edit button to the template that sets the formEnables flag to true





