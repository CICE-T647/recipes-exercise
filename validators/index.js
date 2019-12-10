const { ParameterError } = require('../errors');
const Validator = require('validator');

console.log(Validator)

module.exports.validateSchema = (recipe) => {
    const schema = ['title', 'level', 'ingredients', 'cuisine', 'dishType', 'image', 'duration', 'creator']

    const missing = schema.find((key) => !recipe[key])

    if (missing) throw new ParameterError(`${missing} field cannot be empty`)

    schema.forEach((prop)=>{
        this.validateProperty(recipe, prop)
    })

}

module.exports.validateProperty = (recipe, property) => {
    switch (property) {
        case "image": {
            if (!Validator.isUrl(recipe.image))
                throw new ParameterError("image must be URL string")
            break;
        }
        case "duration": {
            if (!Validator.isInt(recipe.duration) || recipe.duration < 1)
                throw new ParameterError("duration must be a natural number")
        }

        default: return;
    }
}