const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const { getRecipes, getRecipesById, addNewRecipe } = require("./methods.js");
const validateRecipe = require("./validations/recipes/validateRecipe");
const PORT = 3000;

console.log(validateRecipe);

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
  //console.log(newRecipe);
  //console.log(validateRecipe.validateRecipe(newRecipe));
  try {
    validateRecipe.validateRecipe(newRecipe);

    addNewRecipe(newRecipe)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err));
  } catch (err) {
    if (err.status)
      res.status(err.status).json({ message: err.message, ok: err.ok });
    else res.status(500).json({ message: "Internal server error" });
  }
});

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.listen(PORT, () => console.log("Running at port 3000"));
