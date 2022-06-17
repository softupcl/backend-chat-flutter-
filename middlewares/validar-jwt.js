const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer token desde los headers

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no enviado'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }



}

module.exports = {
    validarJWT
}