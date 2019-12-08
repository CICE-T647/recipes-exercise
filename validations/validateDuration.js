module.exports = duration => {
    let error = []
    if ( !duration ) {
        error.push( { 
            status: 422, 
            message: "Duration is a required parameter.", 
            ok: false } )
    }
    return error
}