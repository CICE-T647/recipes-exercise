const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const { getRecipes, getRecipesById } = require("./methods.js");
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const oneRecipe = id => {
  getRecipesById(id)
    .then(data => console.log(data))
    .catch(error => console.log(error));
};
oneRecipe("15");

app.listen(PORT, () => console.log("Running at port 3000"));
