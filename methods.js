const fs = require("fs");

const usersBuffer = fs.readFileSync("./recipes.json"); //leo archivo
const recipes = JSON.parse(usersBuffer);

module.exports.getAll = (req, res) =>{
    res.status(200).json(recipes);
}
//Declaro la promesa para controlar que la peli existe:
const getMovieById = id => {
    return new Promise((resolve, reject) => {
        const parsedRecipes =  recipes.filter(recipe => {
            if (recipe){
                    if(recipe.id == id){
                    return recipe;
                }
            }
        }); 
        if (parsedRecipes.length ==  0) {
            reject("receta no encontrada");
        }else{resolve(parsedRecipes);}
    })
}
//Exporto el método con las dos opciones. 
module.exports.getById = async(req, res) =>{
    const {id} = req.query; 
    try{
        const recipesMatched = await getMovieById(id);
        return res.status(200).json(recipesMatched); 
    }catch(error){
        res.status(404).json({message: error}); 
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