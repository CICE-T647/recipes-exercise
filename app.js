const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const { getRecipes, getRecipesById, addNewRecipe } = require("./methods.js");
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/recipes", (req, res) => {
  res.status(200).json(getRecipes());
});

app.get("/recipe/:id", (req, res) => {
  const { id } = req.params;
  getRecipesById(id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json(error));
});

app.put("/newrecipe", (req, res) => {
  const newRecipe = req.body;
  addNewRecipe(newRecipe)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json(err));
});

app.listen(PORT, () => console.log("Running at port 3000"));
