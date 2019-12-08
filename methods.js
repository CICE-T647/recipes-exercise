const fs = require("fs");

let recetas;

try {
    recetas = require("./recipes.json");
}catch(e) {
    recetas = [];
}

module.exports = getRecipes = (req,res) => {

    if(!recetas || recetas.length < 1) {res.status(422).json({message: "No se han encontrado recetas"})}

    res.status(200).json(recetas);
}

module.exports = getRecipesById = (req,res) => {

    const { id } = req.params;

    const receta = recetas.find( (receta) => receta.id === id)
    res.status(200).json(receta);

}

module.exports = addNewRecipe = (req,res) => {

    const { title, level, ingredients, cuisine, dishType, image, duration, creator } = req.body;

    const newReceta = {
        id: recetas.length +1,
        title,
        level,
        ingredients,
        cuisine,
        dishType,
        image,
        duration,
        creator
    }

    recetas.push(newReceta);

    fs.writeFileSync("./recipes.json", JSON.stringify(recetas, null, 4));
    res.status(200).json({message:"La receta se ha creado correctamente"})

}

module.exports = updateRecipe = (req,res) => {

    const { title, level, ingredients, cuisine, dishType, image, duration, creator } = req.body;
    const { id } = req.params;

    const receta = recetas.map(receta => {
        if (receta){
            if(receta.id == id) {
                receta.title = title ? title : receta.title,
                receta.level = level ? level : receta.level,
                receta.ingredients = ingredients ? ingredients : receta.ingredients,
                receta.cuisine = cuisine ? cuisine : receta.cuisine,
                receta.dishType = dishType ? dishType : receta.dishType,
                receta.image = image ? image : receta.image,
                receta.duration = duration ? duration : receta.duration,
                receta.creator = creator ? creator : receta.creator
            }
        }
        return receta;
    })

    fs.writeFileSync("./recipes.json", JSON.stringify(receta,null,4))
    res.status(200).json({message:"La receta se ha actualizado correctamente"})

}

module.exports = deleteRecipe = (req,res) => {

    const { id } = req.body;

    const receta = recetas.map( receta => {
        if (receta) {
            if (receta.id == id ) {
                recetas[id -1] = null
            }
        }
    })


    fs.writeFileSync("./recipes.json", JSON.stringify(recetas,null,4));
    res.status(200).json({message:"Se ha borrado la receta correctamente"})

}

module.exports = { getRecipes, getRecipesById, addNewRecipe, updateRecipe, deleteRecipe }