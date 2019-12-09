const PORT = 3000;

//importamos las metodos definidos
const recipesApp = require('./modules.js');

//recoje todas las recetas disponibles.
recipesApp.getRecipes();

//receta por id
recipesApp.getRecipesById();

//adicionar receta
recipesApp.addNewRecipe();

//actualizar receta by id
recipesApp.updateRecipe();

//borrar receta by id
recipesApp.deleteRecipe();

//Url no encontrada
recipesApp.notFoundPath();

//Servidor
recipesApp.runServer(PORT);