/*
    Medicos
    ruta: '/api/medico'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos2,
    createDoctor,
    actualizarMedico,
    borrarMedico,
    getDni2,
    getMedicoById
} = require('../controllers/medicos')


const router = Router();

router.get( '/', getMedicos2 );
router.get( '/:nombre/:apellido', getDni2 );


router.post( '/',
    [
    
        check('nombre','El n ombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId()
        
    ], 
    createDoctor 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete( '/:id',
    validarJWT,
    borrarMedico
);

router.get( '/:id',
    validarJWT,
    getMedicoById
);



module.exports = router;



