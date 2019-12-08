const validateTitle = require( "./validateTitle" )
const validateLevel = require( "./validateLevel.js" )
const validateIngredients = require( "./validateIngredients" )
const validateCuisine = require( "./validateCuisine" )
const validateDishtype = require( "./validateDishtype" )
const validateImage = require( "./validateImage" )
const validateTDuration = require( "./validateDuration" )
const validateCreator = require( "./validateCreator" )

const validateRecipe = ( recipe ) => {

    let errors = []
    errors.push(validateTitle( recipe.title ))
    errors.push(validateLevel ( recipe.level ))
    errors.push(validateIngredients( recipe.ingredients ))
    errors.push(validateCuisine( recipe.cuisine ))
    errors.push(validateDishtype (recipe.dishType))
    errors.push(validateImage (recipe.image))
    errors.push(validateTDuration (recipe.duration))
    errors.push(validateCreator (recipe.creator))

    const newMessage = errors.map( error => {
        
        if( error.length>0 ) {
            console.log(typeof(error))
            return error
        }
    } )
    const message = newMessage.filter(Boolean)


    throw {status: 422, message:message, ok: false}
}

module.exports = { validateRecipe }