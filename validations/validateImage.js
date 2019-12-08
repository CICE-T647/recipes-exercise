module.exports = image => {
    let error = []
    const imageStructure = /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi
    const imageTest = imageStructure.test(image)
    if ( !image ) {
        error.push( { 
            status: 422, 
            message: "Image is a required parameter.", 
            ok: false } )
    }else if ( !imageTest ) {        
        error.push( { 
            status: 422, 
            message: "Image must be URL format.", 
            ok: false } )
    }
    return error
}