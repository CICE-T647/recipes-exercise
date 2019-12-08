// Packages
const fs = require("fs")

// --------------------------------------------------------------------------------


// Check & read recipes.json file
const recipesBuffer = fs.readFileSync("./recipes.json")
let recipes

try {
    recipes = JSON.parse(recipesBuffer)
  } catch (err) {
    console.log(err);
    recipes = [];
  }

// --------------------------------------------------------------------------------


//  Get recipes
const getRecipes = () => {    

    return recipes
}

// --------------------------------------------------------------------------------


// Get recipes by ID
const getRecipeByID = ( id ) => {
    
    return new Promise ( ( resolve, reject ) => {
        setTimeout(() => {
            const recipe = recipes.find ( ( recipe ) => recipe.id === id)
            resolve(recipe)
        }, 2000)
    })    
}

// --------------------------------------------------------------------------------


// Add new recipe
const addNewRecipe = ( recipe ) => {

    return new Promise ( ( resolve, reject ) => {
        setTimeout(() => {
              // 
            const newRecipe = {
                // id: String(recipes.length + 1),
                id: String(parseInt(recipes[recipes.length-1].id, 0) + 1 ),
                title: recipe.title,
                level: recipe.level,
                ingredients: recipe.ingredients,
                cuisine: recipe.cuisine,
                dishType: recipe.dishType,
                image: recipe.image,
                duration: recipe.duration,
                creator: recipe.creator
            }
            recipes.push(newRecipe)
            fs.writeFileSync("./recipes.json", JSON.stringify(recipes, null, 4))
            resolve(newRecipe)
        }, 2000)
    })      
}

// --------------------------------------------------------------------------------


// Update recipe
const updateRecipe = ( id, newRecipe ) => {

    return new Promise ( ( resolve, reject ) => {
        setTimeout(() => {
              // validateRecipe(recipe)
            const updatedRecipes = recipes.map( recipe => {
                if( recipe ){
                    if ( recipe.id === id ){
                        recipe.title =  newRecipe.title ? newRecipe.title : recipe.title,
                        recipe.level =  newRecipe.level ? newRecipe.level : recipe.level,
                        recipe.ingredients =  newRecipe.ingredients ? newRecipe.ingredients : recipe.ingredients,
                        recipe.cuisine =  newRecipe.cuisine ? newRecipe.cuisine : recipe.cuisine,
                        recipe.dishType =  newRecipe.dishType ? newRecipe.dishType : recipe.dishType,
                        recipe.image =  newRecipe.image ? newRecipe.image : recipe.image,
                        recipe.duration =  newRecipe.duration ? newRecipe.duration : recipe.duration,
                        recipe.creator =  newRecipe.creator ? newRecipe.creator : recipe.creator
                    } 
                return recipe

                }
            } )
            fs.writeFileSync( "./recipes.json", JSON.stringify( updatedRecipes, null, 4 ) )
            resolve(updatedRecipes)
        }, 2000)
    })

}

// --------------------------------------------------------------------------------


// Delete recipe
const deleteRecipe = ( id ) => {

    let stillRecipes = []
    return new Promise ( ( resolve, reject ) => {
        setTimeout(() => {
              // validateRecipe(recipe)
            const deleteRecipes = recipes.map( recipe => {
                if( recipe ){
                    if ( recipe.id !== id ) { stillRecipes.push(recipe) } 
                }
            } )

            if ( stillRecipes.length >= recipes.length ) {
                reject({ status: 404, message: `Recipe with id ${id} has not been deleted.`})
            }

            fs.writeFileSync( "./recipes.json", JSON.stringify( stillRecipes, null, 4 ) )
            resolve(deleteRecipes)
        }, 2000)
    })

}


module.exports = { getRecipes, getRecipeByID,addNewRecipe,updateRecipe,deleteRecipe }

