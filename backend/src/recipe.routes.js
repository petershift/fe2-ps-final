const recipes = require('./recipe.controllers');

const recipeRoutes = function(app) {
    app.get('/api/recipe', recipes.findAll);
    app.get('/api/recipe/:id', recipes.findById);
    app.post('/api/recipe', recipes.add);
    app.put('/api/recipe/:id', recipes.update);
    app.delete('/api/recipe/:id', recipes.delete);

    app.get('/api/import', recipes.import);
}

module.exports = recipeRoutes;