//Rutas
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

const validateRecipe = require('./validation');

//gestionamos la base de datos
const file = "./recipes.json";
const recipesBuffer = fs.readFileSync(file);
const recipes = JSON.parse(recipesBuffer);

//Inicializadores
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
//metodos funciones

var recipesApp = {
    
    //Run server
    runServer : function(PORT){
        app.listen(PORT, () => {
            console.log(`servidor eschando en puerto ${PORT}`)
        });
    },

    //recoja todas las recetas disponibles.
    getRecipes : function() {
        app.get("/getrecipes", (request,response) =>{
            console.log("Recipes: ", recipes);
            response.status(200).json(recipes);
        });

    },

    //receta por id
    getRecipesById : function(){

        app.get("/getrecipe", (request,response) =>{
            const query = request.query;
            const id = query.id;

            const recipe = recipes.find(recipe => recipe.id === id);
            if(recipe)
                response.status(200).json(recipe);
            else
                response.status(404).json({message:"Receta no encontrada"});
        });
        
    },

    //adicionar receta
    addNewRecipe : function(){
        app.put("/newrecipe", ( request, response) => {
            var maxid = 0;

            //get max id
            recipes.map(function(recipe){     
                if (parseInt(recipe.id) > maxid) 
                    maxid = parseInt(recipe.id);    
            });
            
            const { 
                title,
                level,
                ingredients,
                cuisine,
                dishType,
                image,  
                duration,
                creator,
              } = request.body;
            
            var nextId = maxid + 1;

            const newrecipe = {
                id: nextId.toString(),
                title,
                level,
                ingredients,
                cuisine,
                dishType,
                image,  
                duration,
                creator,
            }
            const result = validateRecipe(newrecipe);

            if (result == result.ok){
                recipes.push(newrecipe);
                fs.writeFileSync(file, JSON.stringify(recipes,null,9));
                response.status(200).json({message : "Receta creada correctamente!."});
            }
            else
                response.status(result.status).json({message :result.message});

        });
    },
    updateRecipe : function(){
        app.post("/updaterecipe/:id", (request,response) => {

            const {id} = request.params;
            console.log(request.params);
            
            const {title,
                level,
                ingredients,
                cuisine,
                dishType,
                image,  
                duration,
                creator } = request.body; 
            
            const newRecipesJSON  = recipes.map( (recipe) => {
                if(recipe){
                    if(recipe.id == parseInt(id)){
                        recipe.title = title ? title : recipe.title;
                        recipe.level = level ? level : recipe.level;
                        recipe.ingredients = ingredients ?  ingredients : recipe.ingredients;
                        recipe.cuisine = cuisine ? cuisine : recipe.cuisine;
                        recipe.dishType = dishType ? dishType : recipe.dishType;
                        recipe.image = image ? image : recipe.image;
                        recipe.duration = duration ? duration : recipe.duration;
                        recipe.creator = creator ? creator : recipe.creator;
                    }
                }
                return recipe;
            } );
        
            fs.writeFileSync(file, JSON.stringify(newRecipesJSON,null,9));
            response.status(200).json({message : "receta actualizada correctamente!."});
        
        });

    },
    deleteRecipe : function(){
        app.delete("/deleterecipe/:id", (request,response) => {
            const { id } = request.params;
            
            const recipe = recipes.find(recipe => recipe.id === id);
            
            if(recipe){
                let newRecipes = recipes.filter(recipe => recipe.id != id );
                fs.writeFileSync(file, JSON.stringify(newRecipes,null,9));
                response.status(200).json({message : "receta eliminada correctamente!."});
            }
            else{
                response.status(404).json({message : "receta no encontrada!."});
            }
        
        })
    },
    notFoundPath : function(){
        app.use((request,response) => {
            //response.send(404);
            response.status(404).json({message: "Page not found"});
        });
    }


}

function findID(recipe,id) { 
    return recipe.id === id;
}

module.exports = recipesApp;