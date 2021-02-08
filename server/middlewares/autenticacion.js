const jwt = require('jsonwebtoken');

//Verificar toquen

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario;

        console.log(req.usuario);
        next();
    });


};

//verifica admin rol
let verificaAdmin_Rol = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
    next();


}

module.exports = {
    verificaToken,
    verificaAdmin_Rol
}