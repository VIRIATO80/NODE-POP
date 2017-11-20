'use strict';
const dotenv = require('dotenv');
dotenv.config({ path: 'variables.env' });


const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', err=>{
    console.log('Ha habido un error', err);
    process.exit(1);
});

conn.once('open', ()=>{
    console.log('BBDDD conectada');
});

//La cadena de conexión es como una url, pero con protocolo MongoDB.
const urlDB = 'mongodb://' + process.env.USUARIO + ':' + process.env.PASSWORD + '@' + process.env.HOST + ':' + process.env.PUERTO + '/' + process.env.SCHEMA;
mongoose.connect( urlDB , {useMongoClient: true});
