const isValidRecipe = require("./validateRecipe");

module.exports = ({ recipe }) => {
  isValidRecipe(recipe);
};
