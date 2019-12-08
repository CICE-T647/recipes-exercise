module.exports = title => {
    let error = []
    if ( !title ) {
        error.push( { 
            status: 422, 
            message: "Title is a required parameter.", 
            ok: false } )
    } else if ( typeof(title)!== "string" ){
        error.push( { 
            status: 422, 
            message: "Title must be a string.", 
            ok: false } )
    }
    return error
}