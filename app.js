const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());

const usersBuffer = fs.readFileSync("./recipes.json");
const recipes = JSON.parse(usersBuffer);     

app.get("/getRecipes", (req, res) => {      
    res.status(200).json(recipes);
});

app.get("/getRecipeById", (req, res) => {
    const id = req.query.id;
    
        const recipeById = recipes.filter(recipe => {          
            return recipe.id == id;                   
        })        
        
        res.status(200).json(recipeById)    
    
})








app.listen(PORT, () => {
    console.log(`escuchando por el puerto ${PORT}`)
})