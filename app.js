// ||======================|| //
// ||                      || //
// ||   RECIPES EXERCISE   || //
// ||         JSC          || //
// ||                      || //
// ||======================|| //



// Packages
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const fs = require("fs")

// Methods
const {
    getRecipes,
    getRecipeByID,
    addNewRecipe,
    updateRecipe,
    deleteRecipe,
} = require("./methods")

const { validateRecipe } = require ("./validations/index")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

// Port
const PORT = 3000



    //////////////
   //          //
  //   CODE   //
 //          //
//////////////



// Get recipes
app.get("/getrecipes", ( req, res ) =>{

    const recipes = getRecipes()

    if( !recipes || !recipes.length ){
        res.status(404).json( {message: "Recipe not found."} )
    }else {
        res.status(200).json( recipes )
    }
})

// --------------------------------------------------------------------------------


// Get recipes by ID
app.post("/getrecipesbyid", async ( req, res ) => {

    const { id } = req.body
    const recipe = await getRecipeByID( id )
    if(!recipe){
        res.status(404).json( {message: `No recipe with ID: '${id}' has been found.`} )
    }
    res.status(200).json( recipe )
})

// --------------------------------------------------------------------------------


// Add new recipe
app.put("/addnewrecipe", async ( req, res ) => {

    const { title, level, ingredients, cuisine, dishType, image, duration,creator } = req.body
    const recipe = {
        title,
        level,
        ingredients,
        cuisine,
        dishType,
        image,
        duration,
        creator
    }

    try{
        validateRecipe(recipe)
        const newRecipe = await addNewRecipe( recipe )
        res.status(200).json({ message: "New recipe has been added correctly." })
    } catch (err) {
        console.log(err);
        if (err.status)
            res.status(err.status).json({ message: err.message, ok: err.ok })
        else res.status(500).json({ message: "Internal server error" })
  }

})

// --------------------------------------------------------------------------------


// Update recipe
app.post("/updaterecipe/:id", async ( req, res ) => {

    // const { title, level, ingredients, cuisine, dishType, image, duration,creator } = req.body
    const newRecipe = req.body
    const { id } = req.params

    try{
        const updatedRecipe = await updateRecipe( id, newRecipe )
        res.status(200).json ({ message: `Recipe with ID ${id} has been updated successfully.` })
    } catch ( err ){
        console.log(err)
        if (err.status)
            res.status(err.status).json({ message: err.message, ok: err.ok })
        else res.status(500).json({ message: "Internal server error." })
    }
})

// --------------------------------------------------------------------------------


// Delete recipe
app.post("/deleterecipe/:id", async ( req, res ) => {

    const { id } = req.params

    try{
        const deletedRecipe =  await deleteRecipe( id )
        console.log(deletedRecipe)
        res.status(200).json ({ message: `Recipe with ID ${id} has been deleted successfully.` })      

    } catch (err){
        console.log(err)
        if (err.status)
        res.status(err.status).json({ message: err.message, ok: err.ok })
        else res.status(500).json({ message: "Internal server error." })
    }

})





app.use( ( req, res ) => res.status(404).json( { meesage: "Page not found." } ) )
 
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}.`))