const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Estudio = require('../models/estudio');


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nnombre: regex,     apellido: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex,     apellido: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })

}

const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                    .populate('usuario', 'nombre apellido dni');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex,     apellido: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}

const getbyDni = async(req, res = response ) => {

  const dni = req.params.dni;


  //console.log('dni look for+++'+dni)

          // data = await Estudio.find({$or: [ {dni: dni}, {dni2: dni} ] })
   
      
       // console.log('daata+++'+data)
       let data = [];
       try {
         data = await Estudio.find({$or: [ {dni: dni}, {dni2: dni} ] });
       } catch (error) {
         console.log(error);
       }
       res.json({
        ok: true, 
       data
    })
}

const getDate = async(req, res = response ) => {

  const startDate2 = new Date( req.params.fechaBuscada);
  const endDate2 = new Date( req.params.fechaBuscada2);
  
  const dnii= req.params.dni;
    // Define the start and end dates to search documents
    const startDate = new Date('2023-04-14');
    const endDate = new Date('2023-04-17');
    console.log('get in Get date')
  
    console.log('date one++++'+startDate2+'++date two++++'+endDate2)
    // Find all documents between the start and end dates
   // const data = await Estudio.find({  fecha: { $gte: startDate, $lt: endDate } })
   const data = await Estudio.find({ fecha: { $gte: startDate2, $lte: endDate2 } });
   
    res.json({
      ok: true, 
     data
  })
    
    console.log('++++++++++data+++++++++');
  
    console.log(''+data);
  
    console.log('++++++++++');
  console.log('dnii++++'+dnii);

//const startDate = new Date('2023-04-02T00:00:00.000+00:00');
//const endDate = new Date('2023-04-02T00:00:00.000+00:00');
/*
const data = await Estudio.find({ 
    
    dni: dnii,
    $and: [
      { fecha: { $gte: startDate } },
      { fecha: { $lte: endDate } }
    ]
}, (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
});
*/
/*
const data = await Estudio.find({ 
    $and:[
        {dni:dnii},
        {        
             $and: [{ fecha: { $gte: startDate, $lte: endDate } 
                   },

                   ] 
        },
  
        ]
                         
        }
    
     )/*/

/*
const data = await Estudio.find({ dnii })
  .where('fecha')
  .gte(new Date('2023-04-2'))
  .lt(new Date('2023-04-15'))*/
 
 
 /* .exec((err, documents) => {
    if (err) {
      console.error(err);
    } else {
      console.log(documents);
    }
  });*/


}




module.exports = {
    getTodo,
    getDate,
    getbyDni,
    getDocumentosColeccion
}

