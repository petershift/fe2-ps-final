const recipes = require('./recipe.controllers');
const reviews = require('./review.controllers');

const recipeRoutes = function(app) {
    app.get('/api/recipe', recipes.findAll);
    app.get('/api/recipe/:id', recipes.findById);
    app.post('/api/recipe', recipes.add);
    app.put('/api/recipe/:id', recipes.update);
    app.delete('/api/recipe/:id', recipes.delete);
    app.get('/api/import', recipes.import);

    app.get('/api/review', reviews.findAll);
    app.get('/api/review/:id', reviews.findById);
    app.get('/api/importR', reviews.import);
    app.post('/api/review', reviews.add);
    app.put('/api/review/:id', reviews.update);
}

module.exports = recipeRoutes;