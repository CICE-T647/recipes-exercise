const validateRecipe = recipe => {
  if (!recipe.title)
    throw {
      status: 422,
      message: "Debe proporcionar una edad",
      ok: false
    };
  if (typeof recipe.title !== "string")
    throw {
      status: 422,
      message: "El formato de la titulo no es correcto",
      ok: false
    };
  if (!recipe.level)
    throw {
      status: 422,
      message: "Debe proporcionar una nivel de dificultad",
      ok: false
    };
  if (typeof recipe.level !== "string")
    throw {
      status: 422,
      message: "El formato de la nivel de dificultad no es correcto",
      ok: false
    };
  if (!recipe.ingredients)
    throw {
      status: 422,
      message: "Debe proporcionar  ingredientes",
      ok: false
    };
  if (typeof recipe.ingredients !== "string")
    throw {
      status: 422,
      message: "El formato de la ingredientes no es correcto",
      ok: false
    };
  if (!recipe.dishType)
    throw {
      status: 422,
      message: "Debe proporcionar una dishtype",
      ok: false
    };
  if (typeof recipe.dishType !== "string")
    throw {
      status: 422,
      message: "El formato de la dishtype no es correcto",
      ok: false
    };
  if (!recipe.duration)
    throw {
      status: 422,
      message: "Debe proporcionar una duration",
      ok: false
    };
  if (typeof recipe.duration !== "string")
    throw {
      status: 422,
      message: "El formato de la duration no es correcto",
      ok: false
    };
  if (!recipe.creator)
    throw {
      status: 422,
      message: "Debe proporcionar una creator",
      ok: false
    };
  if (typeof recipe.creator !== "string")
    throw {
      status: 422,
      message: "El formato de la creator no es correcto",
      ok: false
    };
  if (!recipe.image)
    throw { status: 422, message: "Debe enviar imgUrl", ok: false };

  if (typeof recipe.image !== "string") {
    throw { status: 422, message: "La imagen debe ser un string", ok: false };
  }
  const imgUrlRegexp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  const imgUrlTest = imgUrlRegexp.test(recipe.image);

  if (!imgUrlTest)
    throw { status: 422, message: "El imgUrl no es correcto", ok: false };
};
module.exports.validateRecipe = validateRecipe;
