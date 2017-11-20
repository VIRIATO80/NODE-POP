'use strict';

const fs = require('fs');
// importamos las variables desde nuestro archivo variables.env
//Usamos para ello el módulo dotenv
const dotenv = require('dotenv');
dotenv.config({ path: 'variables.env' });

//Importamos mongoose
const mongoose = require('mongoose');
const urlDB = 'mongodb://' + process.env.USER + ':' + process.env.PASSWORD + '@' + process.env.HOST + ':' + process.env.PUERTO + '/' + process.env.SCHEMA;
mongoose.connect( urlDB , {auth:{authdb:process.env.SCHEMA}});


// importamos varios anuncios de un JSON
const Anuncio = require('../models/Anuncio');
const anunciosJSON = JSON.parse(fs.readFileSync(__dirname + '/anuncios.json', 'utf-8'));


//Importamos los tags iniciales de la aplicación
const Tag = require('../models/Tag');
const tagsJSON = JSON.parse(fs.readFileSync(__dirname + '/tags.json', 'utf-8'));



 async function deleteData() {
  console.log('Borrando tabla de anuncios...');
  await Anuncio.remove();
  console.log('Borrando tabla de tags...');
  await Tag.remove();  
  console.log('Datos eliminados.');
}

 async function loadData() {
  try {
   await Anuncio.insertMany(anunciosJSON);
    console.log('Inserción de anuncios realizada con éxito');
   await Tag.insertMany(tagsJSON);
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


// Connected handler
mongoose.connection.on('connected', function (err) {
  console.log("Connected to DB");
});

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});