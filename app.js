const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');

const validations = require('./validations');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

const recipesBuffer = fs.readFileSync("./recipes.json");
const recipes = JSON.parse(recipesBuffer);



app.get("/getRecipes", (req, res) => {      
    res.status(200).json(recipes);
})


app.get("/getRecipeById", (req, res) => {
    const id = req.query.id;    
        const recipeById = recipes.filter(recipe => {          
            return recipe.id == id;                   
        }) 
        res.status(200).json(recipeById)        
})


app.put("/addnewrecipe", (req, res) => {

    const   { title, level, ingredients, cuisine, dishType, image, duration, creator } = req.body;
      
    const recipe =   {
        id: recipes.length + 1,
        title,
        level,
        ingredients,
        cuisine,
        dishType,
        image, 
        duration,
        creator
      }

      try{
          validations(recipe)
          recipes.push(recipe)
      } catch(e) {
        console.log(e);
        if(e.status)
            res.status(e.status).json({message: e.message, ok: e.ok})
        else res.status(500).json({message: "error interno de servidor"})
      }

      fs.writeFileSync("./recipes.json", JSON.stringify(recipes, null, 4));
      res.status(200).json({message: "RECETA agregada correctamente"}); 

})


app.post("/updaterecipe/:id", (req, res) => {
    const   { title, level, ingredients, cuisine, dishType, image, duration, creator } = req.body;
    const {id} = req.params;

    const newRecipeJSON = recipes.map((recipe) => {
        if(recipe) {
            if(recipe.id == id) {
                recipe.title = title ? title : recipe.title;
                recipe.level = level ? level : recipe.level;
                recipe.ingredients = ingredients ? ingredients : recipe.ingredients;
                recipe.cuisine = cuisine ? cuisine : recipe.cuisine;
                recipe.dishType = dishType ? dishType : recipe.dishType;
                recipe.image = image ? image : recipe.image;
                recipe.duration = duration ? duration : recipe.duration;
                recipe.creator = creator ? creator : recipe.creator;
            }
            return recipe;
        } else {
            return null;
        }
       
    });

    fs.writeFileSync("./recipes.json", JSON.stringify(newRecipeJSON, null, 4));
    res.status(200).json({message: "receta ACTUALIZADA correctamente"});   
})

app.delete("/recipe/:id", (req, res) => {
    const { id } = req.params;   

    recipes[parseInt(id) -1 ] = null;
    console.log(recipes)

   fs.writeFileSync("./recipes.json", JSON.stringify(recipes, null, 4));
    res.status(200).json({message: "receta BORRADA correctamente"});  
})



app.listen(PORT, () => {
    console.log(`escuchando por el puerto ${PORT}`)
})