const fs = require("fs");
const recipes = JSON.parse(fs.readFileSync("./recipes.json"));

//console.log(recipes);

const getRecipes = () => recipes;

const getRecipesById = id => {
  return new Promise((resolve, reject) => {
    const recipeMatched = recipes.find(recipe => recipe.id === id);
    if (!recipeMatched) {
      reject({ message: `No se ha encontrado resultados para la id ${id}` });
    } else {
      resolve(recipeMatched);
    }
  });
};
const oneRecipe = id => {
  getRecipesById(id)
    .then(data => console.log(data))
    .catch(error => console.log(error));
};
oneRecipe("15");

module.exports = { getRecipes, getRecipesById };
