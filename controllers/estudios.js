//const pdf = require('html-pdf');

const { response } = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const Usuario = require('../models/estudio');
const { generarJWT } = require('../helpers/jwt');
const { EvStation } = require('@material-ui/icons');
const Estudio = require('../models/estudio');
const fs = require('fs');
const pdf = require('html-pdf');
const mongoosePaginate = require('mongoose-paginate-v2');
const estudio = require('../models/estudio');

/*
const getEstudios = async(req, res) => {

    const dni = req.params.dni;

    const ca = await Estudio.find({ dni });

   /* const desde = Number(req.query.desde) || 0;

    const [ estudios, total ] = await Promise.all([
        Estudio
            .find({}, 'dni descripE ima fecha2 pd solicitante ')
            .limit( 5 ),

            Estudio.countDocuments()
    ]);

    //const  estudios  = await Estudio.find({},'dniPaciente');
    //const  estudios  = await Estudio.find().populate('estudio','nombre ');


    res.json({
        ok: true,
        ca
    });

}
  */

const getEstudioss = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const [ estudios, total ] = await Promise.all([
        Estudio
            .find({})
            .skip( desde )
            .limit( 5)
                        ,
       Estudio.countDocuments()


        

    ]);

    //const [ estudios ] = await Estudio.paginate()
    
    console.log("El número total de registros es: " + total);
    res.json({
        ok: true,
        estudios,
        total
    });

} 
const getEstudios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const dni = req.params.dni;
    const [ estudios, total ] = await Promise.all([
        Estudio
            .find({dni})
            .skip( desde )
            .limit( 5)
                        ,
       Estudio.find({dni}).countDocuments()
    ]);

    //const [ estudios ] = await Estudio.paginate()
    
    console.log("El número total de registros es: " + total);
    res.json({
        ok: true,
        estudios,
        total
    });

}
const getEstudiosx2 = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const dni2 = req.params.dni;
    const [ estudios, total ] = await Promise.all([
        Estudio
            .find({dni2})
            .skip( desde )
            .limit(50),

        Estudio.find({dni2}).countDocuments()
    ]);


    res.json({
        ok: true,
        estudios,
        total
    });

}


const getEstudioByDni = async(req, res = response) => {
/*
    const dni = req.params.dni;

    try {
        const car = await Estudio.find({ dni });

    const desde =1  ;
    const car = await Estudio.find({ dni });


    const [ estudios, total ] = await Promise.all([
        Estudio
            .find({}, 'dniPaciente descripE ima fecha2 pd solicitante ')
            .skip( desde )
            .limit( 5 ),

            Estudio.countDocuments()
    ]);
  
    //const  estudios  = await Estudio.find({},'dniPaciente');
    //const  estudios  = await Estudio.find().populate('estudio','nombre ');


    res.json({
        ok: true,
        estudios,
        total
    });

    
    const dni = req.params.dni;

    try {
        const car = await Estudio.find({ dni });

  
    
        res.json({
            ok: true,
            car
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }

    */


}

async function crearEstudio(req, res) {

    //const {  dniPaciente} = req.body;
    const {  fecha } = req.body;
    // const { descripcion, fecha} = req.body.contacts.contactType;

    //slet myString = JSON.stringify(req.body, null, 4); // 4 space indentations
    //console.log( 'controller params study'+myString);
   // console.log('fecha' + fecha);
    const estu = new Estudio(req.body);

    //db.estu.save( { month: month, year: year, day: day } )
    //res.send(JSON.stringify(req.body));
    /*
        //console.log( 'my formmmmm from studyController'+req.body.estu);
        const content2 ='./ecocardio.html';
        const content = `
        <h1>Título en el PDF ` + fecha + `"'creado con el paquete html-pdf</h1>
        <p>Generando un PDF con un HTML sencillo</p>
        `;
        const html = fs.readFileSync('./ecocardio.html', 'utf8');
        const nombreArchivo = `${ uuidv4() }`;
        //const path = `./uploads/${ tipo }/${ nombreArchivo }`;
    
        pdf.create(content).toFile(`./pdf/${ nombreArchivo }.pdf`, function(err, res) {
            if (err){
                console.log(err);
            } else {
                console.log(res);
            }
        });
            */
    // let obj = JSON.parse(myString);
    //  estu.fecha2=obj.fecha;
    //console.log( 'controlasdasdads'+obj.fecha);
    // Guardar usuario
   // await estu.save(req.body.contacts.contactType);
   await estu.save();

    // Generar el TOKEN - JWT
    //   const token = await generarJWT( usuario.id );
    res.json({
        ok: true,
        estu
    });


} 
   
   
 
    
  
  /*
        const pdf = require('html-pdf');

        const fs = require('fs');

        const  html = fs.readFileSync('./tpl/tpl-1.html', 'utf8');

        const content = `
        <h1>Título en el PDF creado con el paquete html-pdf</h1>
        <p>Generando un PDF con un HTML sencillo</p>
        `+email;
     
  

        //response.sendFile(path.join(__dirname, '/tpl/tpl-1.html'));

        pdf.create(html).toFile('./pdf/html-pdf.pdf', function(err, res) {
            if (err){
                console.log(err);
            } else {
                console.log(res);
            }
        });
        res.sendFile(__dirname + '/tpl/tpl-1.html');


  */


  /*
  res.sendFile(path.join(__dirname, '../tpl/tpl-1.html'));

  app.get('/main', function(req, res) {

    var name = 'hello';
  
    res.render(__dirname + "/views/layouts/main.html", {name:name});
  */

     

const actualizarEstudio = async (req, res = response) => {

    const uid = req.params.id;


    // TODO: Validar token y comprobar si es el usuario correcto
    try {

        res.json({
            ok: true,
            uid
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    } 
    
    /*


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

    */

}


const borrarEstudio = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Estudio.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un estudio por ese id'
            });
        }

        await Estudio.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Estudio eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}



const toggleButtonState = (req, res) => {

    Estudio.findOne({})
    .then(button => {
        Estudio.state = !Estudio.state;
      return button.save();
    })
    .then(button => res.send(button.state))
    .catch(err => res.status(500).send(err));

}


const state = async(req, res= response) => {



    console.log('state pree in');

   /* 
const uid=req.params.id;


//const usuarioDB = await Estudio.findById( uid );

    try {
        console.log('state in');
        const estudio = await Estudio.findById(objectId);
        console.log('state out');

    
        if (!estudio) {
          return res.status(404).json({ msg: 'Estudio no encontrado' });
        }
    
        estudio.estado = !estudio.estado;
    
        await estudio.save();
    
        res.json(estudio);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
      }
*/
//const id = '643d02afe74e2a4148907054';
const id = req.params.id;

const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId(id);
const estadoss = true;



try {

    const stat = await Estudio.findById( id );

    if ( !stat ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un estudio por ese id'
        });
    }

    stat.estado = !stat.estado;
    await stat.save();
    
    res.json({
        ok: true,
        stat
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
    getEstudioByDni,
     state,
    toggleButtonState,
    getEstudios,
    crearEstudio,
    actualizarEstudio,
    borrarEstudio,
    getEstudioss,
    getEstudiosx2
}