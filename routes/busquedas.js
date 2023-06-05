/*

    ruta: api/todo/
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')

const { getbyDni,getTodo,getDate, getDocumentosColeccion } = require('../controllers/busquedas');

 
const router = Router();


router.get('/:fechaBuscada/:fechaBuscada2' , getDate );
router.get('/:dni' , getbyDni );






module.exports = router;
