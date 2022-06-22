/*
path : /api/usuarios
*/

const { Router } = require('express');
const router = Router();

const { obtenerUsuarios } = require('../controller/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', validarJWT, obtenerUsuarios);


module.exports = router;