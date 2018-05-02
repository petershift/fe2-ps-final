const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
const mongoUri = 'mongodb://devereld:dd2345@ds015730.mlab.com:15730/recipes-dd';
mongoose.connect(mongoUri, { useMongoClient: true } );

// make sure this line always appears before any routes
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next()
})

const recipeModels = require('./src/recipe.model'); 

const routes = require('./src/recipe.routes');
const appRoutes = routes(app);

app.get('/', function (req, res) {
    res.send('api is up');
});

app.listen(3006);
console.log('Server running at http://localhost:3006/');














