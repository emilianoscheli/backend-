const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next ) => {
    const obj =JSON.stringify(req.body);
    console.log( 'valida11111'+obj );

    
    const errores = validationResult( req );

    if ( !errores.isEmpty() ) {
        console.log( 'valid222+obj' );
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}
