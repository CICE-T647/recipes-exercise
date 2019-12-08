module.exports = ingredients => {
    let error = []
    if ( !ingredients ) {
        error.push( { 
            status: 422, 
            message: "Ingredients are required parameter.", 
            ok: false } )
    }
    return error
}