const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

const { catchErrors } = require('../handlers/errorHandlers');



//Load home page
router.get('/', catchErrors(apiController.getListadoAnuncios));
/*
//Add a new store
router.get('/add', apiController.addStore);

//Save store data
router.post('/add', catchErrors(apiController.createStore));

//Edit store data
router.post('/add/:id', catchErrors(apiController.updateStore));

//Stores List
router.get('/stores',catchErrors(apiController.getStores));

//Store Detail
router.get('/stores/:id/edit',catchErrors(apiController.editStore));
*/
module.exports = router;
