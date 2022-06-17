/*
path : /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, validarToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/nuevousuario', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es  obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

router.post('/', [
    check('email', 'El email es  obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], loginUsuario);

router.get('/validartoken', validarJWT, validarToken);


module.exports = router;