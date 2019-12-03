const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const PORT = 3000;
const methods = require("./methods.js");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/recipes", (req, res) =>{
    const recipesBuffer = fs.readFileSync("./recipes.json");
    const recipes = JSON.parse(recipesBuffer);
    res.status(200).json(recipes);//podemos cncatenar las respuestas con el status. 
})

app.get("/recipesById", (req, res) =>{
    const {id} = req.query; 
    const recipesBuffer = fs.readFileSync("./recipes.json");
    const recipes = JSON.parse(recipesBuffer);
    const parsedRecipes =  recipes.filter(recipe => {
       if(recipe.id == parseInt(id)){
            return recipe;
       }
    })
    res.status(200).json(parsedRecipes);//podemos cncatenar las respuestas con el status. 
})

app.put("/newRecipe", (req,res) =>{
    const {title,level,ingredients, cuisine, dishType, image, duration,creator } = req.body; //recoge body
    const usersBuffer = fs.readFileSync("./recipes.json"); //leo archivo
    const recipes = JSON.parse(usersBuffer);
    const newRecipe ={
        id: recipes.length + 1,
        title,
        level,
        ingredients,
        cuisine,
        dishType,
        image,
        duration,
        creator,
    }
    recipes.push(newRecipe); 

    fs.writeFileSync("./recipes.json", JSON.stringify(recipes,null, 4)); //El parametro 4 es el espacio que le pone de identado
    
    res.status(200).json({message: "receta creado correctamente"});
})

app.post("/modifyRecipe", (req, res)=>{
    const {id, title,level,ingredients, cuisine, dishType, image, duration,creator } = req.body; //recoge body
    const usersBuffer = fs.readFileSync("./recipes.json"); //leo archivo
    const recipes = JSON.parse(usersBuffer);
    const newRecipeJson= recipes.map((recipe)=>{
        if (recipe){
            if(recipe.id === id){
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
        }else{
            return null; 
        }        
    }); 
    fs.writeFileSync("./recipes.json", JSON.stringify(newRecipeJson,null, 4)); //El parametro 4 es el espacio que le pone de identado
    res.status(200).json({message: "receta modificada correctamente"});
})

app.delete("/deleteRecipe", (req, res)=>{
    const {id} = req.body;
    const usersBuffer = fs.readFileSync("./recipes.json"); //leo archivo
    const recipes = JSON.parse(usersBuffer);
    recipes[parseInt(id) -1] = null; 
    fs.writeFileSync("./recipes.json", JSON.stringify(recipes,null, 4)); //El parametro 4 es el espacio que le pone de identado
    res.status(200).json({message: "receta borrado correctamente"});
})


//Para poner una respuesta default, pero tiene que estar al final porque sino se ejecutaria antes:
app.use((req, res)=>{
    res.send(404).json({message: "Page not found"});
})



app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})