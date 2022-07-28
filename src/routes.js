const express = require('express');

const routes = express.Router();

const itemController = require('./controller/itemController');
const userController = require('./controller/userController');
const avisoController = require('./controller/avisoController');
const doacaoController = require('./controller/doacaoController');
const reportController = require('./controller/reportController');
const instituicaoController = require('./controller/instituicaoController');

routes.get('/itens', itemController.index);
routes.post('/createItem', itemController.create);
routes.post('/deleteItem/:id', itemController.delete);
routes.post('/getItem/:id', itemController.getItem);

routes.get('/users', userController.index);
routes.post('/createUser', userController.create);
routes.post('/deleteUser/:id', userController.delete);
routes.post('/getForEmail', userController.getForEmail);

routes.get('/avisos', avisoController.index);
routes.get('/avisosAtivos', avisoController.getAvisoAtivo)
routes.post('/createAviso', avisoController.create);
routes.post('/createAvisoEmail', avisoController.createAvisoEmail);
routes.post('/deleteAvisos/:id', avisoController.delete);

routes.get('/doacoes', doacaoController.index);
routes.get('/doacoesAtivas', doacaoController.getDoacoesAtivas);
routes.post('/createDoacao', doacaoController.create);
routes.post('/createDoacaoPorEmail', doacaoController.createDoacaoEmail);
routes.post('/deleteDoacao/:id', doacaoController.delete);

routes.get('/reports', reportController.index);
routes.get('/reportById/:id', reportController.getById);
routes.post('/createReport', reportController.create);
routes.post('/deleteReport/:id', reportController.delete);

routes.get('/instituicoes', instituicaoController.index);
routes.post('/createInstituicao', instituicaoController.create);
routes.post('/getInstTipo/:tipo', instituicaoController.getInstTipo);
routes.post('/updateInstituicao', instituicaoController.update);


module.exports = routes;

