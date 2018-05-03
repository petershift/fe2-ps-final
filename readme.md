# X - Angular

## Homework

<!-- Add a form to the application which allows the creation of a new recipe. -->

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
  <img src="assets/home/{{ recipe.image }}" />
  <p>{{ recipe.description }}</p>
  <button (click)="back()">Back</button>
</div>
```

Import the forms module in `app.module`:

```js
import { FormsModule } from '@angular/forms';

...

  imports: [
    ...
    BrowserModule,
    FormsModule
  ],
```

<!-- ## Binding

1: *html Binding  DOM > Component* works for any HTML attribute:

`<p [ngClass]="currentClasses">`

`<img [src]="vehicle.imageUrl">`

2: *Event Binding  DOM > Component*

In Angular 2 `(click)` (was `ng-click` in Angular 1)

3: *Two Way Binding  DOM < > Component* e.g. `ng-model`.

In Angular 2 we use hotdogs (or a football in a box):

`<input [(ngModel)]="name" />` -->

## ngIf condition

We use *ngIf to toggle a form on the detail page which will allow us to edit a recipe.

* `recipe-detail.component`:

```js
formEnabled: boolean;

  constructor(public dataService: DataService, public route: ActivatedRoute) {
    this.formEnabled = false;
    this.id = this.route.snapshot.params['id'];
  }
```

```html
<div *ngIf="!formEnabled">
  <div *ngIf="recipe">
    <h1> {{ recipe.title }}</h1>
    <img src="assets/home/{{ recipe.image }}" />
    <p>{{ recipe.description }}</p>
    <button (click)="back()">Back</button>
  </div>
</div>
```

For two Way Binding between the DOM < > Component (e.g. `ng-model` in Angular 1) we use hotdogs (or a football in a box): `[(ngModel)]="recipe.title"`

```html
<div *ngIf="formEnabled">
  <div *ngIf="recipe">
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
  </div>
</div>
```

### Form CSS

Note `.angular-cli.json`

```js
"styles": [
  "sass/styles.css"
],
```

Create `_forms.scss` in the sass directory and import it into `styles.scss`.

Add to the styles.scss:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
```

See [this article](https://scotch.io/tutorials/using-sass-with-the-angular-cli) for additional settings.

```css
form {
  margin: 1rem;
  ol {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 1rem;
  }
  li, label {
    display: block;
  }
  fieldset {
    border:none;
    margin: 0;
    padding: 0;
  }
  legend {
    font-size: 1rem;
    font-weight: 700;
  }
  label {
    font-size: 0.875rem;
  }
  input,
  textarea {
    font-weight: 300;
    border: 2px solid #ccc;
    font-size: 1rem;
    width: 100%;
    min-height: 30px;
    display: block;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    border-radius: 3px;
    transition: all 0.5s ease-in-out;
  }
  textarea {
    min-height:100px;
  }
}
```

Focus styles:

```css
*:focus{
  outline: none;
  border-color: #007eb6;
}

input:focus,
textarea:focus {
  box-shadow: 0 0 25px #ccc;
  transform: scale(1.02);
}

input:not(:focus),
textarea:not(:focus) {
  opacity: 0.5;
}
```

Move the button styles from the `recipe.detail` sass file into the new `_forms` styles.

```css
button {
  background: var(--blue);
  color: #fff;
  padding: 0.5rem 0.75rem;
  border: 2px solid #fff;
  border-radius: 3px;
  font-size: 0.75rem;
}
```

And set the input field to a button:

```html
<li>
  <button type="submit" >Update Recipe</button>
</li>
```

Native browser validation

* novalidate
* required, valid, invalid

Add the 3 form images from assets and:

```css
input:required,
textarea:required {
  background: #fff url("/assets/asterisk_orange.png") no-repeat right top;
}

input:valid,
textarea:valid {
  background: #fff url("/assets/tick.png") no-repeat right top;
}

input:focus:invalid,
textarea:focus:invalid {
  background: #fff url("/assets/cancel.png") no-repeat right top;
}
```

Turn off the native browser validation by adding `novalidate` to the form tag.

Add rudimentary Angular validation for *one* of the fields:

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

  <div *ngIf="recipeTitle.errors?.required && recipeTitle.touched" class="alert">A recipe title is required.</div>
  <div *ngIf="recipeTitle.errors?.minlength && recipeTitle.touched" class="alert">The recipe title should be longer.</div>
</li>
```

And:

```css
.alert {
  color: red;
  font-size: 0.875rem;
}
```

* `recipe-detail.component` html template:

```html
<form (submit)="editRecipe()" novalidate>
```

* `recipe-detail.component`:

```js
editRecipe(){
  console.log(this.recipe.title)
}
```

Use async, await:

```js
async editRecipe(){
  console.log(this.recipe)
  const response = await this.dataService.putRecipe(this.recipe)
}
```

* `data.service`:

```js
putRecipe(recipe) {
  console.log('service ' + recipe)
  return this.http.put('http://localhost:3006/api/recipe/' + recipe._id, recipe).toPromise()
}
```

Note the any errors in the console.

Check the access control headers for our http verbs.

* `app.js`:

```js
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE")
  next()
})
```

Set the `formEnabled` flag component.

* `recipe-detail.component`:

```js
async editRecipe(){
  const response = await this.dataService.putRecipe(this.recipe)
  this.formEnabled = false;
}
```

Add a Cancel button to the form that sets the formEnabled flag to false.

Add Edit button to the template that sets the formEnables flag to true.

## Deleting a Recipe

We will do this from the edit recipe page.

Add a delete button.

* `recipe-detail.component`:

```js
async deleteRecipe(){
  const response = await this.dataService.deleteRecipe(this.recipe)
  window.history.back();
}
```

* `data.service`:

```js
deleteRecipe(recipe){
  return this.http.delete('http://localhost:3006/api/recipe/' + recipe._id).toPromise();
}
```

## Adding a Recipe - Notes

I suggest adding a recipe from the recipe list page.

Here is a starter form for use.

```html
<div *ngIf="add">
  <div class="form-wrapper">
    <form>
    <legend>Add Recipe</legend>
      <ol>
        <li>
          <label for="title">Recipe Name</label>
          <input
          ngModel
          minlength="3"
          type="text"
          name="title"
          required
          placeholder="Name" />
        </li>
        <li>
          <label for="image">Image</label>
          <input
          type="text"
          ngModel
          name="image"
          required
          placeholder="Image Name" />
        </li>
        <li>
          <label for="description">Recipe Description</label>
          <textarea
          ngModel
          name="description"
          required>
          </textarea>
        </li>
        <li>
          <button type="submit">Add Recipe</button>
        </li>
      </ol>
    </form>
  </div>
</div>
  <button (click)="addOne()">Add Recipe</button>

```

Create and set a boolean that will display the form.

`add: boolean = true;`

```js
this.add = true;
...

addOne(){
  this.add = !this.add;
}
```

Add submit, mgModel

```html
<div *ngIf="add">
  <div class="form-wrapper">
    <form (ngSubmit)="addRecipe(f)" #f="ngForm">
    <legend>Add Recipe</legend>
      <ol>
        <li>
          <label for="title">Recipe Name</label>
          <input
          ngModel
          minlength="3"
          type="text"
          name="title"
          required
          placeholder="Name" />
        </li>
        <li>
          <label for="image">Image</label>
          <input
          type="text"
          ngModel
          name="image"
          required
          placeholder="Image Name" />
        </li>
        <li>
          <label for="description">Recipe Description</label>
          <textarea
          ngModel
          name="description"
          required>
          </textarea>
        </li>
        <li>
          <button type="submit">Add Recipe</button>
        </li>
      </ol>
    </form>
  </div>
</div>
```

Import NgForm into the component

```js
import { NgForm } from '@angular/forms';

...

async addRecipe(form: NgForm){
  const response =  await this.dataService.addRecipe(form.value)
}
```

Create the function in the service:

```js
addRecipe(recipe){
  return this.http.post(`${this.apiUrl}recipe/`, recipe).toPromise();
}
```

<!-- One way communication

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

See homework assignment above. -->

## Adding a Navbar

```sh
ng g component components/nav
ng g component components/home
ng g component components/reviews
ng g component components/delivery
```

```html
<app-nav></app-nav>
<div class="wrap">
  <router-outlet></router-outlet>
</div>
```

```html
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

```js
const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full"},
  { path: 'recipes', component: RecipesComponent},
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'delivery', component: DeliveryComponent }
]
```

Rudimentary formatting

```css
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

```html
<!-- <h2><a href="recipe/{{ recipe._id }}">{{ recipe.title }}</a></h2> -->
<h2><a [routerLink]="['/recipe', recipe._id]">{{ recipe.title }}</a></h2>
```

## React Comparison

## React Classes

```sh
sudo npm install -g create-react-app
```

```sh
create-react-app react-pirates
```

```sh
cd react-pirates
```

Examine `package.json`

```sh
npm run start
```

Danger- do not do this! Demo only!

```sh
> git init
> git add .
> git commit -m 'testing'
> git branch ejected
> git checkout ejected
> npm run eject
> git status
```

Examine `package.json`

### App.js

What appears to be HTML is JSX.

JSX is a templating language that looks similar to HTML but there are a few extra things that it provides. You can embed any javascript inside of a JSX template by wrapping it in curly braces ({}). Some words are special and reserved, such as class, so there are JSX-specific properties/attributes/etc you need to use (such as className).

In addition, React components must only return a SINGLE JSX node at its root, so it’s very common to wrap up your components into a single div.

1. logo: {logo}: JSX
1. App.css: injected via Webpack:`<style>`
1. class → className: JSX
1. xhtml style closing tags: JSX
1. style="color: purple" → style={{color: 'purple'}}: JSX

Add outside the App div to see a common error:

`<p>test</p>`

Note - to use Emmet run - `ctrl-e`

Comments:

`{ /* comment */ }`

## Additional Installs

1. [React developer tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). Adds a tab to dev tools in Chrome (or Firefox).
1. If you are using Sublime text use Babel - [Package Control: Babel](https://packagecontrol.io/packages/Babel)for syntax highlighting. An Atom react package is also available. Use `JavaScript(Babel)` as your highlighter in Sublime test.

* `app.js`:

Use a more appropraite image (from the React assets).

`import logo from './anchor.svg';`

Provide the logo.

`<h2>Pirate List</h2>`

App.css:

```css
.App-header {
  background-color: #eee;
  height: 150px;
  padding: 20px;
  color: #333;
}
```

### Components

Every component must have a render method.

Create a component.

* Pirate.js

```js
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

* App.js:

```js
import Pirate from './Pirate';
```

Load the new component in `App.js`:

```js
<Pirate tagline="Ahoy there Matey!" />
```

* `Pirate.js`:

```html
<div>
  <p>Pirate Component</p>
  <p>{this.props.tagline}</p>
</div>
```

Inspect using React tool. Find the Pirate component and notice the `props` entry.

#### React dev tools

`$0` - selects the element - a standard feature in the console

`$r` - is the react equivalent

Select `<Pirate />`

`$r.props`

Try on *Instagram* or Facebook - two sites that use React. Find a component that has Object as its prototype.

Exercise - create another component - `Header.js`:

```js
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

* `App.js`:

`import Header from './Header';`

`<Header />`

Breaking out chunks of code into additional components is a very common practice.

## Adding Pirates

New component: `PirateForm.js`:

`import samplePirates from './sample-pirates';`

```jsx
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

```js
import PirateForm from './PirateForm';
```

## State / Data binding

AddPirateForm.js

```jsx
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

```js
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

```js
createPirate(event) {
  event.preventDefault();
  console.log('make a pirate')
}
```

Test.

Add refs to the form to store references to the input:

```html
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

```js
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

```js
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

```js
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

```js
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.state = {
      pirates: {}
    }
  }
```

note - bind() - creates a new function that, when called, has its `this` keyword set to the provided value.

```js
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

`$r.addPirate({name: 'joe'})`

Make the addPirate function available to components with props.

Pass the prop down to PirateForm:

`<PirateForm addPirate={this.addPirate} />`:

```js
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

```js
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

```js
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

## STOP HERE - move to session-10 for better notes

### Use the form to add a pirate

Empty the form with a ref.

`<form ref={(input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>`:

```js
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

```js
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

```js
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

```js
  loadSamples(){
    this.setState({
      pirates: samplePirates
    })
  }
```

```js
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

```js
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

```html
<ul>
  <Pirate />
</ul>
```

Pirate.js:

```js
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

```js
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

```js
<ul>
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
}
</ul>
```

Pirate.js:

```js
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

`http://cmder.net`

cmd-e for Emmet expansion

## Session Ten

## Homework Alt

Review session Ten notes. Use the additional data in sample-pirates.js in Pirate.js including the pirate avatar image.

## Reading

```sh
cd <react-pirates>
subl .
```

.gitignore

```sh
git init
git branch dev
git checkout dev
npm install
npm run start
```

Download MS Code - `https://code.visualstudio.com`

### JSX

App.js > Header.js:

1. logo: {logo}: JSX
1. class → className: JSX
1. xhtml style closing tags: JSX

Examine CSS:

1. injected via Webpack:`<style>`
1. multiple `<style>` tags (advantages?)
1. note prefixing in output

Nesting:

Add `<p>test</p>` above div in Header.js

Comments:

`{/* <img src={logo} className="logo" alt="logo" /> */}`

Demo: jc + TAB

See `http://wesbos.com/react-jsx-comments/`

Note - to use Emmet run - `ctrl-e`

### props

App.js:

```html
<Pirate tagline="Ahoy there Matey!" />
```

Pirate.js:

```html
<p>{this.props.tagline}</p>
```

### React tool

Native: `$0`

React: `$r`

Select `<Pirate />`

Console: `$r.props`

<!-- ### Adding Pirates

PirateForm.js:

`import samplePirates from './sample-pirates';` -->

### State / Data binding Alt

In AddPirateForm.js we created a method - createPirate()

And within, a pirate variable:

```js
  createPirate(event){
    event.preventDefault()
    console.log('making a pirate')
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value
    }
    console.log(pirate)
  }
```

Added [refs](https://facebook.github.io/react/docs/refs-and-the-dom.html) to the form to store references to the input.

When we submit we need to put the contents of the form into our const pirate object.

```html
<form onSubmit={(e) => this.createPirate(e)}>
<input ref={(input) => this.name = input } type="text" placeholder="Pirate name" />
<input ref={(input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
<input ref={(input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
<button type="submit">Add Pirate</button>
</form>
```

Go to React dev tools, find AddPirateForm component, $r in the console to see the inputs.

### Get the pirate object into state

The key difference between props and state is that state is internal and controlled by the component itself, while props are external and controlled by whatever renders the component. - [ref](http://buildwithreact.com/tutorial/state)

We started with App.js:

```js
class App extends Component {

  constructor() {
    super();
    this.state = {
      pirates: {}
    }
  }
```

React tools, find App, view state.

And added to App.js:

```js
  addPirate(pirate){
    //update state
    const pirates = {...this.state.pirates}
    //add new pirate
    const timestamp = Date.now()
    pirates[`pirate-${timestamp}`] = pirate
    //set state
    this.setState({ pirates: pirates })
  }
```

For spread operator see:

`reference / spread-operator.html`

Bind the add form to our app.

App.js:

```js
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.state = {
      pirates: {}
    }
  }
```

#### Review

Review super in classes:

`reference / extending-classes.html`

Note - bind() - creates a new function that, when called, has its `this` keyword set to the provided value.

See:

`reference / bind / index.html`

`reference / bind / button.html`

### State

Test with App in React tool:

$r.addPirate({name: 'joe'})

///// End Review

### Passing Props

We need to make the addPirate function available to AddPirateForm with props.

To PirateForm from App.js:

`<PirateForm addPirate={this.addPirate} />`:

```js
  render() {
    return (
      <div className="App">
      <Header />
      <Pirate tagline="Ahoy there matey!" />
      <PirateForm addPirate={this.addPirate} />
      </div>
      );
  }
```

(Examine PirateForm props in React tool.)

Only one level more! Pass the prop to AddPirateForm.

In PirateForm.js:

`<AddPirateForm addPirate={this.props.addPirate} />`:

```js
import React, { Component } from 'react';
import AddPirateForm from './AddPirateForm'

class PirateForm extends Component {
  render() {
    return (
      <div className="pirate-form">
      <h3>Pirate Forms</h3>
      <AddPirateForm addPirate={this.props.addPirate} />
      </div>
      )
  }
}

export default PirateForm;
```

Examine AddPirateForm props

AddPirateForm:

`this.props.addPirate(pirate);`

```js
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

#### Use the form to add a pirate alt

Empty the form with a [ref](https://facebook.github.io/react/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component).

`<form ref={ (input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>`:

```js
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

```js
createPirate(event) {
    event.preventDefault()
    console.log('make a pirate')
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate)
    this.pirateForm.reset()
  }
```

The form should now empty.

//////// Create a single pirate

Pirate.js:

```js
import React, { Component } from 'react'
import './css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
      <ul>
        <li>Pirate</li>
      </ul>
      )
  }
}

export default Pirate;
```

Unlike Angular there are no built in loops, repeats etc. You must use regular JS. We need a replacement for ng-repeat to make pirate components.

### Sample Pirates

1: Using a JSON Array

Examine sample json file. Make a folder called `data` in `src`.

`JSON.stringify(<data-that-you-want-to-stringify>,<replacer-function-null>,<indentation>)`

Pirate.js:

`import piratesFile from './data/sample-pirates'`:

`<pre><code>{ JSON.stringify(piratesFile, null, 4)}</code></pre>`:

```js
import React, { Component } from 'react'
import './css/Pirate.css'
import piratesFile from './data/sample-pirates'

class Pirate extends React.Component {
  render(){
    return (
      <ul>
        <li>
          <pre><code>{ JSON.stringify(piratesFile, null, 4)}</code></pre>
        </li>
      </ul>
      )
  }
}

export default Pirate;
```

With Array.map():

`array.map(<function that applies to each item in the array>)` to create components

Example: Doubling numbers:

```sh
> var numbers = [1,5,8]
> numbers
> numbers.map(function(number){return number * 2})
> const double = function(number){return number * 2}
> double(5)
> numbers.map(double)
```

See also [session-1](https://github.com/mean-spring-2017/session-1/blob/master/_Arrays/array-methods.html)

Pirate.js:

```js
render(){
  return (
    <ul>
        {piratesFile.pirates.map(function(pirate){
          return (
            <li>
            <h3>{pirate.name}</h3>
            </li>
          )
        })}
    </ul>
    )
}
```

2: With an Object

Switch the json out for the .js version of samples, remove the import (`import piratesFile from './data/sample-pirates'`) and rollback to:

```js
class Pirate extends React.Component {
  render(){
    return (
      <ul>
      <li>Pirate</li>
      </ul>
      )
  }
}
```

App.js

```js
import piratesFile from './data/sample-pirates'
```

(Check for errors - might need to recompile.)

For this version of sample-pirates we cannot easily use .map which is for Arrays.

Use `Object.keys()`  [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

Find App component in React tool.

In console:

`> $r.state.pirates`

`> Object.keys($r.state.pirates)`

App.js:

`{Object.keys(this.state.pirates)}` :

```js
return (
  <div className="App">
    <Header />
    <div className="pirateList">
    {Object.keys(this.state.pirates)}
    </div>
    <PirateForm addPirate={this.addPirate} />
  </div>
);
```

Now that we have an Array:

```js
<ul>
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
}
</ul>
```

Pirate.js:

```js
render(){
  return (
    <ul>
      <li>{this.props.details.name}</li>
    </ul>
    )
}
```

Simplify and add a few more properties:

```js
  render(){
    const {details} = this.props;
    return (
      <ul>
        <li>{details.name}</li>
        <li>{details.weapon}</li>
        <li>{details.vessel}</li>
      </ul>
      )
  }
```

### Load sample data via PirateForm

PirateForm:

`<button onClick={this.props.loadSamples}>Load Sample Pirates</button>`:

```js
  render() {
    return (
      <div className="pirate-form">
      <h3>Pirate Forms</h3>
      <AddPirateForm addPirate={this.props.addPirate} />
      <button onClick={this.props.loadSamples}>Load Sample Pirates</button>
      </div>
      )
  }
```

App.js:

We've alreay imported: `import piratesFile from './sample-pirates'`

```js
loadSamples(){
  this.setState({
    pirates: piratesFile
  })
}
```

```js
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.state = {
      pirates: {}
    }
  }
```

We can use the button in App.js:

```html
<button onClick={this.loadSamples}>Load Sample Pirates</button>
```

Delete and try in PirateForm.

Add to props:

`<PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />`:

```js
    return (
      <div className="App">
      <Header />
      {
        Object
        .keys(this.state.pirates)
        .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
      }
      <PirateForm addPirate={this.addPirate} />
      </div>
      )
```

### Remove Pirate

New function in App:

```js
removePirate(key){
  const pirates = {...this.state.pirates}
  delete pirates[key]
  this.setState({pirates})
}
```

Constructor in App:

```js
this.removePirate = this.removePirate.bind(this)
```

$r (App)

```js
$r.removePirate('pirate1')
```

On Pirate in App `removePirate = {this.removePirate}`:

<!-- Not yet: 
`index={key}` -->

```js
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key}
    details={this.state.pirates[key]}
    removePirate={this.removePirate} /> )
}
```

PirateForm:

`<button onClick={() => this.props.removePirate('pirate1')}>RemovePirate</button>`

```js
<PirateForm
addPirate={this.addPirate}
removePirate={this.removePirate}
loadSamples={this.loadSamples} />
```

Try it on the individual pirates.

Pirate.js:

```js
    return (
      <ul>
        <li>{details.name}</li>
        <li>{details.weapon}</li>
        <li>{details.vessel}</li>
        <button onClick={() => this.props.removePirate('pirate1')}>RemovePirate</button>
      </ul>
      )
```

You cannot access the key inside a component

Pass it along as part of the Pirate component `index={key}` in App:

```js
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key}
    index={key}
    details={this.state.pirates[key]}
    removePirate={this.removePirate} /> )
}
```

Pirate.js (only allowable elment as child of `<ul>` is `<li>`):

```js
return (
  <ul>
    <li>{details.name}</li>
    <li>{details.weapon}</li>
    <li>{details.vessel}</li>
    <li><button onClick={() => this.props.removePirate(this.props.index)}>X</button></li>
  </ul>
  )
```

### Persisting the Data

Create an account at `https://firebase.google.com/`

Create a new project called firstname-lastname-pirates

Go to the empty database (left hand menu)

Go to rules:

```js
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

```js
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

and Publish.

App.js state.

in src create `base.js`

```js
import Rebase from 're-base'

const base = Rebase.createClass({

})
```

`$ npm install rebase --save`

Add domain, database URL, API key.

In Firebase click on Overview > Add Firebase to your webapp

We need:

```js
apiKey: "AIzaSyAHnKw63CUBAqSuCREgils_waYJ0qwpGiU",
authDomain: "daniel-deverell-pirates.firebaseapp.com",
databaseURL: "https://daniel-deverell-pirates.firebaseio.com",
```

```js
import Rebase from 're-base'

const base = Rebase.createClass({
  apiKey: "AIzaSyAHnKw63CUBAqSuCREgils_waYJ0qwpGiU",
  authDomain: "daniel-deverell-pirates.firebaseapp.com",
  databaseURL: "https://daniel-deverell-pirates.firebaseio.com",
})

export default base
```

Import into App.js

`import base from './base'`

Component Lifecycle: component will mount

```js
componentWillMount(){
  this.ref = base.syncState(`daniel-deverell-pirates/pirates`, {
    context: this,
    state: 'pirates'
  })
}
```

```js
componentWillUmount(){
  base.removeBinding(this.ref)
}
```

Load pirates and examine the Firebase HTML5 websockets

To delete a pirate we need to accomodate Firebase:

```js
removePirate(key){
  const pirates = {...this.state.pirates}
  pirates[key] = null
  this.setState({pirates})
}
```

Pirate.js

```js
const myColor = '#C90813'

const myStyle={
  color: myColor
}
```

### Routing

`https://reacttraining.com/react-router/web/guides/quick-start`

`> npm install react-router-dom --save`

index.js

```js
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class Main extends React.Component {
  render() {
    return (
    <Router>
    <div>
      <Route exact path="/" component={App}/>
    </div>
  </Router>
      )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
  );
```

### Pirate Detail

Use Header.js as a template

```js
import React, { Component } from 'react'

class PirateDetail extends Component {
  render() {
    return (
      <div className="pirate-detail">
        <h1>Pirate detail</h1>
      </div>
      )
  }
}

export default PirateDetail;
```

`<Route path="/pirate/:pid" component={PirateDetail} />`:

```js
import PirateDetail from './PirateDetail';

class Main extends React.Component {
  render() {
    return (
    <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/pirate/:pid" component={PirateDetail} />
    </div>
  </Router>
      )
  }
}
```

We probably want the routing to occur in App.js to keep the header and replace `<Pirate />` and `<PirateForm />`

### Validation Homework

Note the dependencies in package.json.

`npm install`

`npm run boom!`

Note the classes Angular adds to the input fields as they are manipulated by the user in `static/partials/pirate-list.template.html`

Give the form a name:

`<form ng-submit="addPirate(pirate)" name="addform">`

Disable the submit button:

`<button ng-disabled="addform.$invalid" type="submit">Add Pirate</button>`

Note: you can visually identify the button as being disabled using:

```css
button[disabled] {
  background: #bbb;
  cursor: not-allowed;
  border: none;
}
```

`https://www.w3schools.com/csSref/playit.asp?filename=playcss_cursor&preval=not-allowed`

Give the input a name. Add a paragraph with ng-show conditions.

```html
<div class="form-group">
  <label>
    <input ng-model="$ctrl.pirate.name" required ng-minlength="6" placeholder="Name" name="pname" />
    <svg viewBox="0 0 20 20" class="icon">
      <path d="M0 0 L10 10 L0 20"></path>
    </svg>
  </label>
  <p class="error" ng-show="addform.pname.$invalid && addform.pname.$touched"> A name must have at least 6 characters.</p>
</div>
```

Note the svg.

```css
.error {
  color: red;
}

label {
  display: flex;
  height: 2rem;
}

input {
  width: 100%;
  height: 1.6rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid hsl(0%, 0%, 85%);
  order: 1;
}
```

`https://www.sitepoint.com/closer-look-svg-path-data/`

Ref: this video from [frontend.center](https://www.youtube.com/watch?v=af4ZQJ14yu8).

```css
input:focus {
  outline: none;
  border-color: hsl(0%, 0%, 25%)
}

.icon {
  width: 1rem;
  opacity: 0;
  transition: all 0.5s;
  transform: translateX(-100%)
  // stroke-dasharray: 0, 20;
  // stroke-dashoffset: -14.642;
}

.icon path {
  stroke: black;
  fill: none;
  stroke-width: 1px;
}

input:focus + .icon {
  opacity: 1;
  transform: translateX(0)
  // stroke-dasharray: 28.284, 20;
  // stroke-dashoffset: 0;
}

.ng-valid.ng-not-empty {
  border-color: hsl(166, 72%, 40%)
}

.ng-invalid.ng-dirty {
  border-color: hsl(0, 100%, 40%)
}

```

Using the dash effect:

```css
.icon {
  width: 1rem;
  // opacity: 0;
  transition: all 0.5s;
  // transform: translateX(-100%)
  stroke-dasharray: 0, 20;
  stroke-dashoffset: -14.642;
}

.icon path {
  stroke: black;
  fill: none;
  stroke-width: 1px;
}

input:focus + .icon {
  // opacity: 1;
  // transform: translateX(0)
  stroke-dasharray: 28.284, 20;
  stroke-dashoffset: 0;
}
```

See `https://www.w3schools.com/angular/angular_validation.asp` for a complete set of examples for Angular validation.
