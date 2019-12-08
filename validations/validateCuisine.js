module.exports = cuisine => {
    let error = []
    if ( !cuisine ) {
        error.push( { 
            status: 422, 
            message: "cuisine is a required parameter.", 
            ok: false } )
    }
    return error
}