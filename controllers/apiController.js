'use strict';

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const Tag = mongoose.model('Tag');


/*Lista todos los anuncios de la base de datos en formato JSON o html*/
exports.getListadoAnuncios = async function home(req, res, next){
    const Anuncios = await Anuncio.find();

    if(req.baseUrl.indexOf('/api') != -1){//Si la petición proviene del api, devolvemos JSON
        res.json(Anuncios);    
    }else{//Si la petición es para la web, renderizamos el portal y por ello necesitamos también pedir los tags
        const Tags = await Tag.find();
        res.render('index', { title: 'NodePop!', Anuncios: Anuncios, Tags: Tags });
    }  
}


//Lista todos los tags de la base de datos en formato JSON
exports.getListadoTags = async (req, res, next) =>{
  
    //Query para listar todos los tags disponibles para los artículos de la tienda
    const Tags = await Tag.find();
    res.json(Tags);    
}


/* GET anuncios filtrados 
- Lista todos los anuncios de la base de datos en formato JSON o html que cumplen unos determinados criterios
- Los parámetros se pasan vía req.query.
-Los parametros aceptados son los siguientes:
    +tag = Categoría a la que pertenece el artículo
    +venta = Será true si el artículo está a la venta y false si se trata de una búsqueda de un particular
    +nombre = Contendrá parte del nombre de un artículo
    +precio = Rango del precio

Ejemplo:
  /apiv1/anuncios?tag=mobile&venta=false&nombre=ip&precio=50-&start=0&limit=2&sort=precio
*/
exports.getAnunciosFiltrados = async (req, res, next) =>{
    
    const tags = req.query.tags;
    const venta = req.query.venta;
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const filter = {};

    if(tags){
      let lista = [];
      lista = tags;
      console.log(lista);
      filter.tags = { $in: lista } ;
    }

    //si el producto se vende o se busca
    if(venta){
      filter.venta = venta;
    }

    //Si el nombre comienza por la cadena introducida
    if(nombre){
      filter.nombre = new RegExp('^'+ nombre, "i");
    }

    //Filtro por precio
    if(precio){
      if(precio === '10-'){
          filter.precio = { '$gte': '10' };
      }else if(precio === '10-50'){
          filter.precio = { '$gte': '10', '$lte': '50' };          
      }else if (precio === '-50'){
          filter.precio = { '$lte': '50' };
      }else if (precio === '+50'){
        filter.precio = { '$gte': '50' };
      }else{
        filter.precio = '50';
      }
    }      

    //Recuperar una lista de anuncios de la base de datos
    const Anuncios = await Anuncio.find(filter);
    //Si la petición proviene del api, devolvemos JSON
    res.json(Anuncios);
}


/*Carga la página del formulario de creación de anuncios*/
exports.cargarFormularioCreacion = async function(req, res, next){
    const Tags = await Tag.find();
    res.render('addAnuncio', { title: 'Crear Anuncio', Tags: Tags });
};


/* POST Guarda un anuncio vía POST*/
exports.guardarAnuncio = async (req, res, next) => {
  console.log(req.body);
  //Recuperamos los datos en el body del método
  //Creamos un nuevo agente
  const anuncio = new Anuncio(req.body);
  console.log(anuncio);
  //Lo guardamos en la base de datos
  const anuncioGuardado = await anuncio.save();
console.log(1);
  //Vemos si viene de la web o es una llamada pura al API
  if(req.query.web){
    console.log(2);
    res.redirect('/');
  }else{
    res.json({success: true, result: anuncioGuardado});
  } 
}