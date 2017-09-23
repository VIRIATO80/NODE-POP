'use strict';

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { catchErrors } = require('../handlers/errorHandlers');


//Load home page
router.get('/', catchErrors(apiController.getListadoAnuncios));

//Load create form
router.get('/add', apiController.cargarFormularioCreacion);

//Save store data
router.post('/add', apiController.upload, catchErrors(apiController.guardarAnuncio));

module.exports = router;
