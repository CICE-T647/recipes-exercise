module.exports = level => {
    let error = []
    const levelType = typeof(level)
    if ( !level ) {
        error.push( { 
            status: 422, 
            message: "Level is a required parameter.", 
            ok: false } )
    }
    return error
}