module.exports = creator => {
    let error = []
    if ( !creator ) {
        error.push( { 
            status: 422, 
            message: "Creator is a required parameter.", 
            ok: false } )
    }
    return error
}