const fs = require("fs");

function getRecipes() {
    recipesTmp = fs.readFileSync("./recipes.json");
    recipes = JSON.parse(recipesTmp);
    return recipes;
}

function getRecipeById(id) {
    const recipesTmp = fs.readFileSync("./recipes.json");
    const recipes = JSON.parse(recipesTmp);
    if (recipes[id - 1]) return recipes[id - 1];
}

function addNewRecipe(recipe) {
    const recipesTmp = fs.readFileSync("./recipes.json");
    const recipes = JSON.parse(recipesTmp);

    recipe["id"] = (recipes.length + 1).toString();

    recipes.push(recipe);
    fs.writeFileSync("./recipes.json", JSON.stringify(recipes));
    if (recipes) return recipe;
}

function updateRecipe(recipe) {
    const recipesTmp = fs.readFileSync("./recipes.json");
    const recipes = JSON.parse(recipesTmp);

    const id = Number(recipe.id);

    if (id < recipes.length) {
        const NewMap = recipes.map(currentRecipes => {
            if (currentRecipes.id === recipe.id) {
                for (const recipeItem of Object.entries(recipe)) {
                    currentRecipes[recipeItem[0]] = recipeItem[1];
                }
            }
        });
        console.log(recipes);
        fs.writeFileSync("./recipes.json", JSON.stringify(recipes));
        if (recipes) return recipes;
    }
}

function deleteRecipe(id) {
    const recipesTmp = fs.readFileSync("./recipes.json");
    const recipes = JSON.parse(recipesTmp);
    if (recipes.length > id && recipes[id - 1] != null) {
        recipes[id - 1] = null;
        fs.writeFileSync("./recipes.json", JSON.stringify(recipes));
        if (recipes) return recipes;
    }
}

module.exports = {
    getRecipes,
    getRecipeById,
    addNewRecipe,
    updateRecipe,
    deleteRecipe
};
