/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario,getSolicitante,updatePass } = require('../controllers/usuarios');
const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/' , getUsuarios );
router.get( '/:dni' , getSolicitante );


router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearUsuario 
);

router.put( '/:id',
    [
        validarJWT,
        varlidarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.put( '/:dni/:password',  updatePass);

router.delete( '/:id',
    [ validarJWT, varlidarADMIN_ROLE ],
    borrarUsuario
);



module.exports = router;