const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const recipesBuffer = fs.readFileSync("./recipes.json");

let recipes;
try {
    recipes = JSON.parse(recipesBuffer);
} catch (e) {
    recipes = [];
}

app.get("/getrecipes", (req, res) => {
    console.log("recipes", recipes);
    if (recipes) res.status(200).json(recipes);
    res.status(404).json({ message: `Recipes not found` });
});

app.get("/getrecipesbyid", (req, res) => {
    const { id } = req.query;

    const recipeById = recipes.find(recipe => {
        if (recipe.id === id) {
            return id;
        }
    });
    console.log("recipe", recipeById);
    console.log("recipe", id);
    if (recipeById) {
        res.status(200).json(recipeById);
    } else {
        res.status(404).json({ message: `Recipe with id: ${id} not found` });
    }
});

app.put("/addnewrecipe", (req, res) => {
    const {
        title,
        level,
        ingredients,
        cuisine,
        dishType,
        image,
        duration,
        creator
    } = req.body;

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

    console.log(newRecipe);
    try {
        recipes.push(newRecipe);
        fs.writeFileSync("./data.json", JSON.stringify(recipes, null, 4));
        res.status(200).json(recipes);
    } catch (err) {
        res.status(404).json({ message: "page not found" });
    }
});

app.post("/updaterecipe/:id", (req, res) => {
    const { id } = req.params;
    const {
        title,
        level,
        ingredients,
        cuisine,
        dishType,
        image,
        duration,
        creator
    } = req.body;
    console.log(req.body);
    console.log(id);
    const updatedRecipies = recipes.map(recipe => {
        if (recipe) {
            if (recipe.id === id) {
                recipe.title = title ? title : recipe.title;
                recipe.level = level ? level : recipe.level;
                recipe.cuisine = cuisine ? cuisine : recipe.cuisine;
                recipe.ingredients = ingredients
                    ? ingredients
                    : recipe.ingredients;
                recipe.dishType = dishType ? dishType : recipe.dishType;
                recipe.image = image ? image : recipe.image;
                recipe.duration = duration ? duration : recipe.duration;
                recipe.creator = creator ? creator : recipe.creator;
            }
        }
    });
    try {
        res.status(200).json(updatedRecipies);
    } catch (err) {
        res.status(404).json({ message: "page not found" });
    }
});

app.delete("/deleterecipe/:id", (req, res) => {
    const { id } = req.params;
    console.log("id", id);
    // recipe[id - 1] = null;
    const index = recipes.map(recipe => {
        if (recipe.id === id) {
            console.log(recipe.id);
        }
    });

    res.status(200).json({ message: "usuario actualizado correctamente" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
