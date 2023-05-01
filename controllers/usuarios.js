const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getSolicitante = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const dni = req.params.dni;
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({dni})
            .skip( desde )
            .limit(1 ),

            Usuario.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios,
        total
    });


}
const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre apellido dni password   ')
            .skip( desde )
            .limit( 99 ),

        Usuario.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios,
        total
    });

}

const crearUsuario = async(req, res = response) => {

    const obj =JSON.stringify(req.body);
    console.log( 'im on tthe register controler'+obj );

    const { dni, password } = req.body;

    try {

        const existeDni = await Usuario.findOne({ dni });
/*
        if ( existeDni ) {
            return res.status(400).json({
                ok: false,
                msg: 'El dni ya está registrado'
            });
        }
        */

        const usuario = new Usuario( req.body );
        console.log( 'pasoo' );

        // Encriptar contraseña
        
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
        
        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        if ( !usuarioDB.google ){
            campos.email = email;
        } else if ( usuarioDB.email !== email ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const updatePass = async (req, res = response) => {


     // TODO: Validar token y comprobar si es el usuario correcto
     /*/
     const { password , dni} = req.body;
     console.log('inside update password')
 
 
     try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            65,
          { password },
          { new: true }
        );
        res.status(200).json(usuarioActualizado);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }



*/


    /* try {
 
        const usuarioDB = await Usuario.findOne({ dni });
 
         if ( !usuarioDB ) {
             return res.status(404).json({
                 ok: false,
                 msg: 'No existe un usuario por ese id'
             });
         }
 
   
   
 
         const usuarioActualizado = await Usuario.findByIdAndUpdate( dni, password, { new: true } );
 
         res.json({
             ok: true,
             usuario: usuarioActualizado
         });
 
         
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             msg: 'Error inesperado'
         })
     }


     */

     const { id } = req.params;
     
 
   
        const { dni } = req.params;
        const { password } = req.params;
        const obj =JSON.stringify(req.body);
        console.log( 'im on tthe updateeee controler+++'+req.body );
      
        try {
        const { dni } = req.params;
              // Encriptar contraseña       // Hash the new password

        
        const salt = bcrypt.genSaltSync();
        hashedPassword = bcrypt.hashSync( password, salt );
     

          const usuarioActualizado = await Usuario.findOneAndUpdate(
            { dni },
            {  password: hashedPassword  },
            { new: true }
          );
          res.status(200).json(usuarioActualizado);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
   

}

const borrarUsuario = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    getSolicitante,
    updatePass,
    borrarUsuario
}