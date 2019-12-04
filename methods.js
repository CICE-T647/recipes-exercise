const fs = require("fs");
const validate = require("./validations"); 
const usersBuffer = fs.readFileSync("./recipes.json"); //leo archivo
//Controlo que hay recetas en el Json y sino creo un array vacío
let recipes; 
try{
    recipes = JSON.parse(usersBuffer);
}catch(e){
    recipes = []; 
}
//Devolver todas las recetas
module.exports.getAll = (req, res) =>{
    res.status(200).json(recipes);
}
//Devolver recetas por ID
module.exports.getById = (req, res) =>{
    const {id} = req.query; 
    try{
        //Valido el id
        validate.validateId(id); 
        //Controlo que haya recetas en el json sino digo que no hay recetas
        if(!recipes || !recipes.length){
            res.status(404).json({message: "No hay recetas en la base de datos"}); 
        }else{
            const parsedRecipes =  recipes.filter(recipe => {
            if (recipe){
                    if(recipe.id == id){
                    return recipe;
                }
            }
            });
            res.status(200).json(parsedRecipes);   
        }
    }
    catch(err){
        console.log(err)
        if(err.status){
            res.status(err.status).json({message: err.message, ok: err.ok})
        }else{
            res.status(500).json({message: "Internal Server error"})
        }
    }  
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
    fs.writeFileSync("./recipes.json", JSON.stringify(recipes,null, 4)); 
    res.status(200).json({message: "receta creada correctamente"});
}

const modifyRecipeBiId = (id, title,level,ingredients, cuisine, dishType, image, duration,creator) => {
    return new Promise((resolve, reject) => {
        const parsedRecipes =  recipes.filter(recipe => {
            if (recipe){
                    if(recipe.id == id){
                    return recipe;
                }
            }
        }); 
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
        if (parsedRecipes.length === 0){
            reject("No se ha encontrado la receta");
        }else{
            resolve(newRecipeJson); 
        }
    })
}

module.exports.modifyRecipe = async (req, res)=>{
    const {id, title,level,ingredients, cuisine, dishType, image, duration,creator } = req.body; 
    try{
        const recipesMatched = await modifyRecipeBiId(id, title,level,ingredients, cuisine, dishType, image, duration,creator);
        fs.writeFileSync("./recipes.json", JSON.stringify(recipesMatched,null, 4)); 
        res.status(200).json({message: "receta modificada correctamente"});
    }
    catch(error){
        res.status(404).json({message: error}); 
    }
}

module.exports.delete = (req, res)=>{
    const {id} = req.body; //recoge body
    recipes[parseInt(id) -1] = null; 
    fs.writeFileSync("./recipes.json", JSON.stringify(recipes,null, 4)); 
    res.status(200).json({message: "receta borrado correctamente"});
}
module.exports.notFind =  (req, res)=>{
    res.send(404).json({message: "Page not found"});
}