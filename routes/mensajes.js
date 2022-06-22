/*
path : /api/mensajes
*/

const { Router } = require('express');
const router = Router();

const { obtenerChat } = require('../controller/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/:de', validarJWT, obtenerChat);


module.exports = router;