const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const methods = require("./methods.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/recipes", methods.getAll); 
app.get("/recipesById", methods.getById);
app.put("/newRecipe",methods.putRecipe); 
app.post("/modifyRecipe", methods.modifyRecipe); 
app.delete("/deleteRecipe", methods.delete)

app.use(methods.notFind)



app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})