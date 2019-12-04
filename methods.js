const fs = require("fs");
const recipes = require("./recipes.json")


const createRecipes = () => {
    console.log("GET USERS")
};


const getRecipes = () => {
    return recipes;
};

const deleteRecipes = (id) => {

    const selectedRecipe = recipes.find(recipe => recipe.id == id);
    if (selectedRecipe) {
        const newRecipes = recipes.filter(recipe => recipe.id != id);
        fs.writeFileSync("./recipes.json", JSON.stringify(newRecipes, null, 4));
        return `La receta ${selectedRecipe.title} se ha eliminado correctamente`;
    }
    return "No existe la receta";
};


const updateRecipes = (recipe) => {
    const { id, title, level, ingredients, cuisine, dishType, image, duration, creator } = recipe;
    const newRecipe = recipes.map((recipe) => {
        if (recipe) {
            if (recipe.id == id) {
                recipe.title = title ? title : recipe.title;
                recipe.level = level ? level : recipe.level;
                recipe.ingredients = ingredients ? ingredients : recipe.ingredients;
                recipe.cuisine = cuisine ? cuisine : recipe.cuisine;
                recipe.dishType = dishType ? dishType : recipe.dishType;
                recipe.image = image ? image : recipe.image;
                recipe.duration = duration ? duration : recipe.duration;
                recipe.creator = creator ? creator : recipe.creator;
            }
            return recipe;
        } else return null;
    })
    console.log(newRecipe);
    if (newRecipe) {
        fs.writeFileSync("./recipes.json", JSON.stringify(newRecipe, null, 4));
        return `La receta con el id ${id} se ha actualizado correctamente`;
    } else {
        return `No existe la receta con este ${id}`;
    }

};


module.exports = { createRecipes, getRecipes, deleteRecipes, updateRecipes };