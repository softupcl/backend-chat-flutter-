const { response } = require("express");
const Usuario = require('../models/usuario');

const obtenerUsuarios = async(req, res = response) => {

    //para paginacion
    const desde = Number(req.query.desde) || 0;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde)
        .limit(20);

    res.json({
        ok: true,
        usuarios,

    });
}

module.exports = {
    obtenerUsuarios
}