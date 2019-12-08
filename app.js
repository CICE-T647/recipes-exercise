const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let recetas;

try {
    recetas = require("./recipes.json");
}catch(e) {
    recetas = [];
}

const { getRecipes, getRecipesById, addNewRecipe, updateRecipe, deleteRecipe } = require("./methods");

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/getrecipes", (req,res) => {

    getRecipes(req,res);

})

app.get("/getrecipesbyid/:id", (req,res) => {

    getRecipesById(req,res);

})

app.post("/addnewrecipe", (req,res) => {

    addNewRecipe(req,res);

})

app.put("/updaterecipes/:id", (req,res) => {

    updateRecipe(req,res);

})

app.delete("/deleterecipe", (req,res) => {

    deleteRecipe(req,res);

})


app.listen(PORT, () => {console.log(`Escuchando puerto ${PORT}`)} );
app.use(express.static(__dirname + "/public"));