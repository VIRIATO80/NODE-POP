const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const anuncioSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


//Añadimos métodos estáticos a nuestro modelo
anuncioSchema.statics.list = function(filter, skip, limit, callback){
    console.log('llega');
    const query = Anuncio.find(filter);
    query.skip(skip);
    query.limit(limit);
    return query.exec(callback);//Es aquí donde ejecutamos la consulta
}
//Crear el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;