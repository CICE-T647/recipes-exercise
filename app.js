const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const { getRecipes, deleteRecipes, updateRecipes } = require("./methods");

// middleware para parsear el body de los mensajes
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/getrecipes", (req, res) => {
    const recipes = getRecipes();
    res.send(recipes);
})

app.delete("/deleterecipes", (req, res) => {
    const { id } = req.query;
    const mensaje = deleteRecipes(id);
    res.send(mensaje);
})

app.post("/updaterecipe", (req, res) => {
    const recipe = req.body;
    const mensaje = updateRecipes(recipe);
    res.send(mensaje);
})


app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
})