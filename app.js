const express = require('express');
const bodyParser = require('body-parser');
const {getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, addNewRecipe} = require('./methods');

const app = express();

const port = 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {getAllRecipes(req, res)})
app.get('/:id', (req, res) => {getRecipeById(req, res)})
app.put('/', (req, res) => {addNewRecipe(req, res)})
app.post('/:id', (req, res) => {updateRecipe(req, res)})
app.delete('/:id', (req, res) => {deleteRecipe(req, res)})


app.listen(port, ()=>{
    console.log("App corriendo en " + port)
})
