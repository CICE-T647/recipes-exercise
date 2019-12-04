module.exports =  ({ title, level, ingredients, cuisine, dishType, image, duration, creator }) => {

    if( !title) throw {message: "debe introducir título", ok: false};
    if( !level) throw {message: "debe introducir level", ok: false};
    if( !ingredients) throw {message: "debe introducir ingredients", ok: false};
    if( !cuisine) throw{message: "debe introducir cuisine", ok: false};
    if( !dishType) throw {message: "debe introducir dishType", ok: false};
    if( !image) throw {message: "debe introducir image", ok: false};
    if( !duration) throw {message: "debe introducir duration", ok: false};
    if( !creator) throw{message: "debe introducir creator", ok: false};
} 
