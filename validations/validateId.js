module.exports = (id) => {
    if(!id) throw({status: 404, message: "No hay Id", ok: false})
    if (typeof(parseInt(id))==="number") throw ({status: 404, message:"El Id no es un número por favor introduce un número", ok: false});
}