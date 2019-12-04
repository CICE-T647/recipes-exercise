const fs = require("fs");

const usersBuffer = fs.readFileSync("./recipes.json"); //leo archivo
const recipes = JSON.parse(usersBuffer);

module.exports.getAll = (req, res) =>{
    res.status(200).json(recipes);
}

module.exports.getById = (req, res) =>{
    const {id} = req.query; 
    const parsedRecipes =  recipes.filter(recipe => {
       if (recipe){
            if(recipe.id == id){
                return recipe;
            }
        }else{return null}
    })
    res.status(200).json(parsedRecipes);
}

module.exports.putRecipe = (req,res) =>{
    const {title,level,ingredients, cuisine, dishType, image, duration,creator } = req.body; //recoge body
    const newRecipe ={
        id: (recipes.length + 1).toString(),
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
}

module.exports.modifyRecipe = (req, res)=>{
    const {id, title,level,ingredients, cuisine, dishType, image, duration,creator } = req.body; //recoge body
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
}

module.exports.delete = (req, res)=>{
    const {id} = req.body; //recoge body
    recipes[parseInt(id) -1] = null; 
    fs.writeFileSync("./recipes.json", JSON.stringify(recipes,null, 4)); //El parametro 4 es el espacio que le pone de identado
    res.status(200).json({message: "receta borrado correctamente"});
}
module.exports.notFind =  (req, res)=>{
    res.send(404).json({message: "Page not found"});
}