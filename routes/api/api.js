"use strict";

const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/apiController');
const { catchErrors } = require('../../handlers/errorHandlers');


/* GET /api/anuncios
Lista todos los Anuncios*/
router.get('/anuncios', catchErrors(apiController.getListadoAnuncios));

/* GET /api/anuncios
Devuelve los anuncios que cumplen unos determinados criterios*/
router.get('/busqueda', catchErrors(apiController.getAnunciosFiltrados));


/* GET /api/tags
Lista todos los tags disponibles*/
router.get('/tags', catchErrors(apiController.getListadoTags));

/* GET /api/detalle/<idAnuncio>
    Muestra el detalle de un solo anuncio por su id
*/
router.get('/detalle/:id', catchErrors(apiController.getDetalleAnuncio));



module.exports = router;