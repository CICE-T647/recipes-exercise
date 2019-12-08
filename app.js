const PORT = 3000;

//importamos las metodos definidos
const recipesApp = require('./modules.js');

//recoje todas las recetas disponibles.
recipesApp.getRecipes();

//receta por id
recipesApp.getRecipesById();

//adicionar receta
recipesApp.addNewRecipe();

//Url no encontrada
recipesApp.notFoundPath();


//Servidor
recipesApp.runServer(PORT);