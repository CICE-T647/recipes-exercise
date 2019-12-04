const fs = require("fs");
const recipes = JSON.parse(fs.readFileSync("./recipes.json"));

//console.log(recipes);

const getRecipes = () => recipes;

const getRecipesById = id => {
  return new Promise((resolve, reject) => {
    const recipeMatched = recipes.find(recipe => recipe.id == id);
    if (!recipeMatched) {
      reject({ message: `No se ha encontrado resultados para la id ${id}` });
    } else {
      resolve(recipeMatched);
    }
  });
};

const addNewRecipe = newRecipe => {
  return new Promise((resolve, reject) => {
    newRecipe.id = recipes.length + 1;
    if (!recipes.push(newRecipe)) {
      fs.writeFileSync("./recipes.json", JSON.stringify(recipes, null, 4));
      reject({ message: "Error al incluir la nueva receta" });
    }
    resolve({ message: "La receta se ha incluido correctamente" });
  });
};

module.exports = { getRecipes, getRecipesById, addNewRecipe };
