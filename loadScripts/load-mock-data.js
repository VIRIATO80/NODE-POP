'use strict';

const fs = require('fs');
// importamos las variables desde nuestro archivo variables.env
//Usamos para ello el módulo dotenv
const dotenv = require('dotenv');
dotenv.config({ path: 'variables.env' });

//Importamos mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);


// importamos varios anuncios de un JSON
const Anuncio = require('../models/Anuncio');
const anunciosJSON = JSON.parse(fs.readFileSync(__dirname + '/anuncios.json', 'utf-8'));

//Importamos los tags iniciales de la aplicación
const Tag = require('../models/Tag');
const tagsJSON = JSON.parse(fs.readFileSync(__dirname + '/tags.json', 'utf-8'));



function deleteData() {
  console.log('Borrando tabla de anuncios...');
  Anuncio.remove();
  console.log('Borrando tabla de tags...');
  Tag.remove();  
  console.log('Datos eliminados.');
}

function loadData() {
  try {
    Anuncio.insertMany(anunciosJSON);
    console.log('Inserción de anuncios realizada con éxito');
    Tag.insertMany(tagsJSON);
    console.log('Inserción de tags realizada con éxito');    
    process.exit();
  } catch(e) {
    console.log('\nSe ha producido un error en la inserción de datos\n\n\n', e);
    process.exit();
  }
}

//Primero borramos y después insertamos los anuncios y los tags de prueba
deleteData();
loadData();

