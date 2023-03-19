/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getEstudios2, crearEstudio, actualizarEstudio, borrarEstudio, getEstudioByDni } = require('../controllers/estudios');
const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');


const router = Router();


//router.get( '/:dni' , getEstudios );
router.get( '/:dni' , getEstudios2 );


router.post( '/', 
   // [
        //check('dniPaciente', 'El dni del Paciente es obligatorio').not().isEmpty(),
        //check('password', 'El password es obligatorio').not().isEmpty(),
        //check('email', 'El email es obligatorio').isEmail(),
      //validarCampos,
    //], 
    crearEstudio 
);

router.put( '/:id',
    [
        //validarJWT,
        //varlidarADMIN_ROLE_o_MismoUsuario,
        //check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        //check('email', 'El email es obligatorio').isEmail(),
     //   check('role', 'El role es obligatorio').not().isEmpty(),
       // validarCampos,
    ],
    actualizarEstudio
);

router.delete( '/:id',
    [ validarJWT, varlidarADMIN_ROLE ],
    borrarEstudio
);
/*
router.get( '/:dni',
 
    getEstudioByDni
);
*/



module.exports = router;







