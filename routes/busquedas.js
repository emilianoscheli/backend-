/*

    ruta: api/todo/
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')

const { getTodo,getDate, getDocumentosColeccion } = require('../controllers/busquedas');


const router = Router();


//router.get('/:busqueda', validarJWT , getTodo );
router.get('/:fechaBuscada/:fechaBuscada2' , getDate );


//router.get('/coleccion/:tabla/:busqueda' , getDocumentosColeccion );



module.exports = router;