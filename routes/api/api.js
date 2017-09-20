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

/* POST /api/
Guarda un anuncio vía petición POST*/
router.post('/', catchErrors(apiController.guardarAnuncio));
module.exports = router;