const fs = require('fs')
const { NotFoundError, ParameterError } = require('./errors');
const { validateSchema, validateProperty } = require('./validators')
const recipes = require('./recipes.json')

module.exports.getAllRecipes = (req, res)=>{
    res.status(200).json(recipes)
}

module.exports.getRecipeById = (req, res)=>{
    try{
        const { id } = req.params;
        
        const recipe = recipes.find((recipe)=> recipe.id == id)
        if(!recipe) throw new NotFoundError("Found no recipe corresponding that ID")

        res.status(200).json(recipe)
    }catch(error){
        if(error instanceof NotFoundError) res.status(404).json({success: false, error: error.message})
        else if(error instanceof ParameterError) res.status(422).json({success: false, error: error.message})
        else res.status(500).json({success: false, error: error.message})
    }
}

module.exports.addNewRecipe = (req, res)=>{
    try{
        const recipe = req.body;
        validateSchema(recipe);
        
        recipe.id = recipes.length +1;
        recipes.push(recipe)

        updateJSON(recipes);

        res.status(200).json({success: true})
    }catch(error){
        if(error instanceof NotFoundError) res.status(404).json({success: false, error: error.message})
        else if(error instanceof ParameterError) res.status(422).json({success: false, error: error.message})
        else res.status(500).json({success: false, error: error.message})
    }
}

module.exports.updateRecipe = (req, res)=>{
    try{
        const { id } = req.params;

        const params = req.body;
        
        const recipe = recipes.find((recipe)=> recipe.id == id)
        if(!recipe) throw new NotFoundError("Found no recipe corresponding that ID")

        if(params.id) delete params.id

        for(let param of Object.keys(params)){
            validateProperty(recipe, param)
            recipe[param] = params[param]
        }

        updateJSON(recipes);

        res.status(200).json({success: true})
    }catch(error){
        if(error instanceof NotFoundError) res.status(404).json({success: false, error: error.message})
        else if(error instanceof ParameterError) res.status(422).json({success: false, error: error.message})
        else res.status(500).json({success: false, error: error.message})
    }
}

module.exports.deleteRecipe = (req, res)=>{
    try{
        const { id } = req.params;

        const recipe = recipes.find((recipe)=> recipe.id == id)
        if(!recipe) throw new NotFoundError("Found no recipe corresponding that ID")
        
        const newRecipes = recipes.filter((recipe)=> !(recipe.id == id))

        updateJSON(newRecipes)

        res.status(200).json({success: true})
    }catch(error){
        if(error instanceof NotFoundError) res.status(404).json({success: false, error: error.message})
        else if(error instanceof ParameterError) res.status(422).json({success: false, error: error.message})
        else res.status(500).json({success: false, error: error.message})
    }
}

const updateJSON = (array)=>{
    console.log(array)
    const result = JSON.stringify(array, null, 4)
    fs.writeFile('./recipes.json', result, 'utf8', ()=>{});
}