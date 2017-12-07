# Session 10 - Angular

## Homework

Add a form to the application which allows the creation of a new recipe.

## FoodApp

* `npm install` both the backend and foodapp directories.
* `npm run start` on both directories.

### mLab

If necessary:

* edit the mLab connection string in app.js to point to your own recipes database
* go to the api imports endpoint in a browser to seed your collection

Notes:

* Added apiUrl to data.service
* Added imageUrl to recipe-detail component

Correct the errors we saw on the recipe-detail rendering by removing the Elvis (`?`) operators and testing for the presence of the data with `*ngIf` instead.

* recipe-detail html:

```html
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

2: *Event Binding  DOM > Component* 

Was `ng-click` in Angular 1.

In Angular 2 `(click)`

3: *Two Way Binding  DOM < > Component* e.g. `ng-model`. 

In Angular 2 we use hotdogs (or a football in a box):

`<input [(ngModel)]="name" />`

## ngIf condition

We use *ngIf to toggle a form on the detail page which will allow us to edit a recipe.

* recipe-detail.component

```js
formEnabled: boolean;

constructor(public dataService: DataService, public route: ActivatedRoute) {
  this.formEnabled = true;
}
```

```html
<div *ngIf="!formEnabled">
  <div *ngIf="recipe">
    <h1> {{ recipe.title }}</h1>
    <img style="max-width: 30%" src="assets/home/{{ recipe.image }}" />
    <p>{{ recipe.description }}</p>
    <button (click)="back()">Back</button>
  </div>
</div>
```


```html
  <div class="form-wrapper">
    <form action="#" method="post" > 
    
      <fieldset>
        <legend>Edit Recipe</legend>
        <ol>
          <li>
            <label for="name">Recipe Title</label>
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

Tet two way binding by adding this to the form:

`<p>{{ recipe.title }}</p>`

### Form CSS

For SASS

Create a sass directory in src and styles.scss within.

* .angular-cli.json

```
"styles": [
  "sass/styles.css"
],
```

See [this article](https://scotch.io/tutorials/using-sass-with-the-angular-cli) for additional settings.

* basics

```css
  form {
    max-width:620px;
    margin: 20px auto;
  }

  ol {
    list-style: none;
    padding: 0;
  }
  li, label {
    display: block; /* was display:flex;*/
  }
  fieldset {
    border:none;
  }
  legend {
    font-size:24px;
    margin-bottom:20px;
  }
  input, 
  textarea {
    border:1px solid #ccc;
    font-size:20px;
    min-width:480px;
    min-height:30px;
    display:block;
    margin-bottom:16px;
    margin-top:8px;
    border-radius:5px;
    transition: all 0.5s ease-in-out;
  }
  textarea {
    min-height:100px;
  }
```

* focus

```css
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

```css
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

```css
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

```css
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

  <div *ngIf="recipeTitle.errors?.required && recipeTitle.touched" class="alert">Title is required</div>
  <div *ngIf="recipeTitle.errors?.minlength && recipeTitle.touched" class="alert">Recipe title should be longer</div>

</li>


```

* recipe-detail.component html template

```html
<form (submit)="editRecipe()">
```

* recipe-detail.component

```js
editRecipe(){
  console.log(this.recipe.title)
}
```

async, await:

```js
async editRecipe(){
  console.log(this.recipe)
  const response = await this.dataService.putRecipe(this.recipe)
}
```

* data.service

```js
putRecipe(){
  console.log('service ' + this.recipe)
}
```

then

```js
putRecipe(recipe) {
  console.log('service ' + recipe)
  return this.http.put('http://localhost:3006/api/recipe/' + recipe._id, recipe).toPromise()
}
```

Note the error in the console.

Add access control headers for our http verbs.

* app.js

```js
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE")
  next()
})
```

Set the formEnabled flag component.

* recipe-detail.component:

```js
async editRecipe(){
  console.log(this.recipe)
  const response = await this.dataService.putRecipe(this.recipe)
  this.formEnabled = false;
}
```

Add a Cancel button to the form that sets the formEnables flag to false

Add Edit button to the template that sets the formEnables flag to true

## Deleting a Recipe

We will do this from the edit recipe page.

Add a delete button.

* recipe-detail.component 

```js
async deleteRecipe(){
  const response = await this.dataService.deleteRecipe(this.recipe)
  window.history.back();
}
```

* data.service

```js
  deleteRecipe(recipe){
    return this.http.delete(`${this.apiUrl}recipe/${recipe._id}`).toPromise();
  }
```

## Adding a Recipe - Notes

I suggest adding a recipe from the recipe list page.

Here is a starter form for use. Note the `value="{{ test }}"` 

```html
<div *ngIf="add">
    <div class="form-wrapper">
      <form (submit)="addRecipe()">
        <legend>Add Recipe</legend>
        <ol>
          <li>
            <label for="name">Recipe Name</label>
            <input 
            value="{{ test }}"
            minlength="3" 
            type="text" 
            name="name" 
            required 
            placeholder="Recipe Name" />
          </li>
          <li>
            <label for="image">Image</label>
            <input type="text" name="image" required placeholder="Image Name" />
          </li>
          <li>
            <label for="description">Recipe Description</label> 
            <textarea name="description" required></textarea>
          </li>
          <li>
            <input type="submit" value="Add Recipe" />
          </li>
        </ol>
      </form>
    </div>
  </div>

  <button (click)="addOne()">Add Recipe</button>
```

Create a boolean that will display the form.

```js
this.add = true;
...

addOne(){
  this.add = true;
}
```

One way communication

In input:

`value="{{ title }}"`

In component:

```js
title:string;

...


this.title = 'test'
```

```js
addRecipe(){
  console.log(this.title)
}
```

Add two way binding

```html
<li>
  <label for="name">Recipe Title</label>
  <input 
  [(ngModel)]="title"

  ...

</li>
```

and test.

Add footballs to all 3 inputs, then try consoling:

```js
addRecipe(){
  console.log(this)
}
```

See homework assignment above.

## Adding a Navbar

ng g component components/nav

```
<app-nav></app-nav>
<div class="wrap">
  <router-outlet></router-outlet>
</div>
```

```
<nav>
  <h1>Yum Yum!</h1>
  <ul>
    <li><a href="" routerLink="">Home</a></li>
    <li><a href="" routerLink="/recipes">Recipes</a></li>
    <li><a href="" routerLink="/reviews">Reviews</a></li>
    <li><a href="" routerLink="/delivery">Delivery</a></li>
  </ul>
</nav>
```

```
const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full"},
  { path: 'recipes', component: RecipesComponent},
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'delivery', component: DeliveryComponent }
]
```

Rudimentary formatting

```
nav {
  display: flex;
  background: #000;
  align-items: center;
}
nav h1 {
   color: #fff; 
   font-family: Lobster; 
   white-space: nowrap;
}
nav ul {
  width:100%;
  display: flex;
  list-style: none;
  justify-content: space-around; 
  font-family: Lobster;
}
nav il {

}
nav a {
  padding: 0.5rem;
  color: #fff;
  background: var(--green)
}
```

To use routerLink elsewhere in our app we need to bind the routerLink. E.g.:

```
<!-- <h2><a href="recipe/{{ recipe._id }}">{{ recipe.title }}</a></h2> -->
<h2><a [routerLink]="['/recipe', recipe._id]">{{ recipe.title }}</a></h2>
```








# React

## React Classes

```
$ sudo npm install -g create-react-app
```

See also: [Create Angular App](https://cli.angular.io)

```
$ create-react-app react-pirates
```

```
$ cd react-pirates
```

```
npm run start
```

Danger- do not do this! Demo only! 

```
> git init
> git add .
> git commit -m 'testing'
> git branch ejected
> git checkout ejected
> npm run eject
> git status
```

Examine package.json

### App.js

What appears to be HTML is JSX.

1. logo: {logo}: JSX
1. App.css: injected via Webpack:`<style>`
1. class → className: JSX
1. xhtml style closing tags: JSX
1. style="color: purple" → style={{color: 'purple'}}: JSX

Add outside the App div:

`<p>test</p>`

Note - to use Emmet run - `ctrl-e`

Comments:

`{ /* comment */ }` see http://wesbos.com/react-jsx-comments/


## Additional Installs

1. [React developer tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). Adds a tab to dev tools in Chrome (or Firefox).
1. [Package Control: Babel](https://packagecontrol.io/packages/Babel). For syntax highlighting. An Atom react package is available.

Use `JavaScript(Babel)` as your highlighter in Sublime test.

App.js:

`import logo from './anchor.svg';`

`<h2>Pirate List</h2>`

App.css:

```
.App-header {
  background-color: #eee;
  height: 150px;
  padding: 20px;
  color: #333;
}
```

### Components

Pirate.js

```
import React, { Component } from 'react';

class Pirate extends React.Component {
  render(){
    return (
      <p>Pirate Component</p>
      )
  }
}

export default Pirate;
```

App.js

```
import Pirate from './Pirate';
```

```
<Pirate tagline="Ahoy there Matey!" />
```

Pirate.js

```
<p>{this.props.tagline}</p>
```

Inspect using React tool.

#### React dev tools

`$0`

`$r`

Select <Pirate />

`$r.props`

Exercise - creating another component

```
import React, { Component } from 'react';
import logo from './anchor.svg';

class Header extends React.Component {
  render(){
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Pirate List</h2>
      </div>)
    }
  }

export default Header;
```

`import Header from './Header';`

## Adding Pirates

New component: PirateForm.js:

`import samplePirates from './sample-pirates';`

```
import React, { Component } from 'react';
import AddPirateForm from './AddPirateForm';

class PirateForm extends React.Component {
  render(){
    return (
      <div>
      <h3>Pirate Forms</h3>
      <AddPirateForm />
      </div>
      )
  }
}

export default PirateForm;
```

App.js

```
import PirateForm from './PirateForm';
```

State / Data binding

AddPirateForm.js

```
import React, { Component } from 'react';

class AddPirateForm extends React.Component {
  render(){
    return (
      <form>
      <input type="text" placeholder="Pirate name" />
      <input type="text" placeholder="Pirate vessel" />
      <input type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
      </form>
      )
  }
}

export default AddPirateForm;
```

Method - createPirate

`<form onSubmit={(e) => this.createPirate(e)}>`:

```
    return (
      <form onSubmit={(e) => this.createPirate(e)}>
      <input type="text" placeholder="Pirate name" />
      <input type="text" placeholder="Pirate vessel" />
      <input type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
      </form>
      )
```

In AddPirateForm (above render:

```
createPirate(event) {
  event.preventDefault();
  console.log('make a pirate')
}
```

Test

Add refs to the form to store references to the input:

```
<form onSubmit={(e) => this.createPirate(e)}>
<input ref={(input) => this.name = input } type="text" placeholder="Pirate name" />
<input ref={(input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
<input ref={(input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
<button type="submit">Add Pirate</button>
</form>
```

Go to React dev tools, find AddPirateForm component, $r in the console to see the inputs.

Create the pirate const variable

AddPirateForm:

```
  createPirate(event) {
    event.preventDefault();
    console.log('make a pirate');
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    console.log(pirate)
  }
```

Test.

Get the pirate object into state. 

The key difference between props and state is that state is internal and controlled by the component itself while props are external and controlled by whatever renders the component. - [ref](http://buildwithreact.com/tutorial/state)

App.js:

```
class App extends Component {

  constructor() {
    super();
    this.state = {
      pirates: {}
    }
  }
```

React tools, find App, view state.

App.js:

```
  addPirate(pirate){
    //update state
    const pirates = {...this.state.pirates}
    //add new pirate
    const timestamp = Date.now();
    pirates[`pirate-${timestamp}`] = pirate;
    //set state
    this.setState({ pirates: pirates })
  }
```

Bind the add form to our app.

App.js:

```
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.state = {
      pirates: {}
    }
  }
```

note - bind() - creates a new function that, when called, has its `this` keyword set to the provided value.

```
var foo = {
    x: 3
}
var bar = function(){
    console.log(this.x);
}
bar(); // undefined
var boundFunc = bar.bind(foo);
boundFunc(); // 3
```

Test with: 

$r.addPirate({name: 'joe'})

Make the addPirate function available to components with props.

Pass the prop down to PirateForm:

`<PirateForm addPirate={this.addPirate} />`:  

```
return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pirate List</h2>
        </div>
        <ul>
          <Pirate />
        </ul>
        <PirateForm addPirate={this.addPirate} />
      </div>
    );
```

Examine PirateForm props

Only one level more! Pass the prop to AddPirateForm.

PirateForm:

`<AddPirateForm addPirate={this.props.addPirate} />`:

```
  render(){
    return (
      <div>
      <h3>Pirate Forms</h3>
      <AddPirateForm addPirate={this.props.addPirate} />
      </div>
      )
  }
```

Examine AddPirateForm props

AddPirateForm:

`this.props.addPirate(pirate);`

```
  createPirate(event) {
    event.preventDefault();
    console.log('make a pirate');
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate);
  }
```

# STOP HERE - move to session-10 for better notes

#### Use the form to add a pirate.

Empty the form with a ref.

`<form ref={(input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>`:

```
    return (
      <form ref={(input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>
      <input ref={(input) => this.name = input } type="text" placeholder="Pirate name" />
      <input ref={(input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
      <input ref={(input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
      </form>
      )
```

and `this.pirateForm.reset();`:

```
createPirate(event) {
    event.preventDefault();
    console.log('make a pirate');
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate);
    this.pirateForm.reset();
  }
```

### Load sample data into state

PirateForm:

`<button onClick={this.loadSamples}>Load Sample Pirates</button>`:

```
    return (
      <div>
      <h3>Pirate Forms</h3>
      <AddPirateForm addPirate={this.props.addPirate} />
      <button onClick={this.props.loadSamples}>Load Sample Pirates</button>
      </div>
      )
```

App.js

`import samplePirates from './sample-pirates'`

```
  loadSamples(){
    this.setState({
      pirates: samplePirates
    })
  }
```

```
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.state = {
      pirates: {}
    }
  }
```


`<PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />`:

```
return (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Pirate List</h2>
    </div>
    <ul>
      <Pirate />
    </ul>
    <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
  </div>
);
```

Loading the pirates

App.js:

```
<ul>
  <Pirate />
</ul>
```

Pirate.js:

```
import React, { Component } from 'react';

class Pirate extends React.Component {

  render(){
    return (
      <li>
        <p>Pirate</p>
      </li>
      )
  }
}

export default Pirate;
```

Unlike Angular there are no built in loops, repeats etc. You must use regular JS.

Here - cannot use .map which is for Arrays.

Use `Object.keys()`

Find App component in React tool. In console: `$r.state.pirates`

Load samples and run again to see data. Can't loop over that!

`Object.keys($r.state.pirates)`

App.js:

`{Object.keys(this.state.pirates)}`

```
return (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Pirate List</h2>
    </div>
    <ul>
    {Object.keys(this.state.pirates)}
    </ul>
    <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
  </div>
);
```

```
<ul>
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
}
</ul>
```

Pirate.js:

```
  render(){
    const {details} = this.props;
    return (
      <li>
        <h4>{details.name}</h4>
        <p>{details.weapon}</p>
        <p>{details.vessel}</p>
      </li>
      )
  }
```

Load sample pirates.



### Notes
http://cmder.net
cmd-e for Emmet expansion







