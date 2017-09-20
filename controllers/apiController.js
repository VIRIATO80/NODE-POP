"use strict";

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const Tag = mongoose.model('Tag');


/*Lista todos los anuncios de la base de datos en formato JSON o html*/
exports.getListadoAnuncios = async (req, res, next) =>{
    const Anuncios = await Anuncio.find();

    if(req.baseUrl.indexOf('/api') != -1){//Si la petición proviene del api, devolvemos JSON
        res.json({success: true, rows: Anuncios});    
    }else{//Si la petición es para la web, renderizamos el portal y por ello necesitamos también pedir los tags
        const Tags = await Tag.find();
        res.render('index', { title: 'NodePop!', Anuncios: Anuncios, Tags: Tags });
    }
    
}


/*Lista todos los tags de la base de datos en formato JSON*/
exports.getListadoTags = async (req, res, next) =>{
    //Query para listar todos los tags disponibles para los artículos de la tienda
    const Tags = await Tag.find();
    res.json({success: true, rows: Tags});    
}

/* GET /api/detalle/id Recupera el anuncio con un id dado
*/
exports.getDetalleAnuncio = async (req, res, next) => {
  
  //Recupera una consulta para recuperar un solo anuncio de la base de datos
  const idAnuncio =  req.params.id
  const datosAnuncio = await Anuncio.findOne({_id: idAnuncio});
  res.json({success: true, result: datosAnuncio}); 
};

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
    
    const tag = req.query.tag;
    const venta = req.query.venta;
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const filter = {};

    if(tag){
      let lista = [];
      lista[0] = tag;
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
      }else{
        filter.precio = '50';
      }
    }      


    //Recuperar una lista de anuncios de la base de datos
    const Anuncios = await Anuncio.find(filter);


    if(req.baseUrl.indexOf('/api') != -1){//Si la petición proviene del api, devolvemos JSON
        res.json({success: true, rows: Anuncios});    
    }else{//Si la petición es para la web, renderizamos el portal y por ello necesitamos también pedir los tags
        res.render('index', { title: 'NodePop!', Anuncios: Anuncios});
    }
    
}