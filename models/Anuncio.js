'use strict';

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


//Crear el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;