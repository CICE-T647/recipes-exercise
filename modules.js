//Rutas
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');


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

            response.status(200).json(recipe);
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
        
            recipes.push(newrecipe);
            fs.writeFileSync(file, JSON.stringify(recipes,null,9));
            response.status(200).json({message : "Receta creada correctamente!."});
        
        });
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