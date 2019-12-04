const express = require("express");
const methods = require("./methods");
const bp = require("body-parser");

const app = express();

const PORT = 3000;

const reqParams = [
    "title",
    "level",
    "ingredients",
    "cuisine",
    "dishType",
    "image",
    "duration",
    "creator"
];

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.get("/getRecipes", (req, res) => {
    const recipes = methods.getRecipes();
    if (recipes) res.status(200).json(recipes);
    res.status(404).json({ message: `Recipes not found` });
});

app.get("/getRecipeById", (req, res) => {
    const { id } = req.query;
    const keys = Object.keys(req.query);
    if (keys.length != 1 || !keys.includes("id"))
        res.status(440).json({ message: `Bad Query Parameters` });

    const recipe = methods.getRecipeById(id);
    if (recipe) res.status(200).json(recipe);
    res.status(404).json({ message: `Recipe with ${id} ID not found` });
});

app.post("/addNewRecipe", (req, res) => {
    const keys = Object.keys(req.body);
    if (keys.length != reqParams.length)
        res.status(440).json({ message: `Bad Parameters` });

    for (const key of keys) {
        if (!reqParams.includes(key))
            res.status(440).json({ message: `Bad Parameters` });
    }
    const newRecipe = methods.addNewRecipe(req.body);
    if (newRecipe) res.status(200).json(newRecipe);
    res.status(500).json({ message: `Server Error adding new Recipe` });
});

app.post("/updateRecipe", (req, res) => {
    const { id } = req.body;
    const keys = Object.keys(req.body);

    if (!keys.includes("id"))
        res.status(440).json({ message: `Bad Parameters: ID is required` });

    if (!Number(id))
        res.status(440).json({ message: `Bad Parameters: ID is a number` });

    if (keys.length > reqParams.length + 1)
        res.status(440).json({
            message: `Bad Parameters: Number of parameter is excedeed`
        });

    for (const key of keys) {
        if (!reqParams.includes(key) && key != "id")
            res.status(440).json({ message: `Bad Parameters` });
    }

    const recipes = methods.updateRecipe(req.body);
    if (recipes) res.status(200).json(recipes[id - 1]);
    res.status(404).json({ message: `Server Error modifing Recipe ${id}` });
});

app.delete("/deleteRecipe", (req, res) => {
    const { id } = req.query;
    const keys = Object.keys(req.query);

    if (!keys.includes("id"))
        res.status(440).json({ message: `Bad Parameters: ID is required` });

    if (!Number(id))
        res.status(440).json({ message: `Bad Parameters: ID is a number` });

    if (keys.length > 1)
        res.status(440).json({
            message: `Bad Parameters: Number of parameter is excedeed`
        });

    const recipes = methods.deleteRecipe(id);
    if (recipes) res.status(200).json(recipes);
    res.status(500).json({ message: `Server Error deleting a Recipe` });
});

app.use((req, res) => {
    res.status(404).json({ message: "page not found" });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
