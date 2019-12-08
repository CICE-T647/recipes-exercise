module.exports = dishtype => {
    let error = []
    if ( !dishtype ) {
        error.push( { 
            status: 422, 
            message: "Dishtype is a required parameter.", 
            ok: false } )
    }
    return error
}