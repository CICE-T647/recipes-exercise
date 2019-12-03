const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const PORT = 3000;

app.get("/getrecipes", (req, res) => {
    const recipesBuffer = fs.readFileSync("./recipes.json");

    const recipes = JSON.parse(recipesBuffer);
    console.log("recipes", recipes);

    res.status(200).json(recipes);
});

app.get("/getrecipesbyid", (req, res) => {
    const { id, title } = req.query;
    const recipesBuffer = fs.readFileSync("./recipes.json");

    const recipes = JSON.parse(recipesBuffer);
    const recipeById = recipes.find(recipe => {
        if (recipe.id === id) {
            return id;
        }
    });
    console.log("recipe", recipeById);
    console.log("recipe", id);

    res.status(200).json(recipeById);
});

app.put("/addnewrecipe", (req, res) => {
    const newRecipe = {
        id: recipes.length + 1,
        title,
        level,
        ingredients,
        cuisine,
        dishType,
        image,
        duration,
        creator
    };
    recipes.push(newRecipe);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
