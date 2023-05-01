const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')


    res.json({ 
        ok: true,
        medicos
    })
}
const getDni2 = async(req, res = response) => {
    const  searchName = req.params.nombre;
    const  searchLastname = req.params.apellido;
    

    console.log(searchName);
    console.log(searchLastname);

    const medico = await  Medico.find({ nombre: searchName, apellido: searchLastname})
                            

    res.json({ 
        ok: true,
        medico
    })
}
const getMedicos2 = async(req, res = response) => {

    const medicos = await Medico.find()
                           


    res.json({ 
        ok: true,
        medicos
    })
}
const getDni = async(req, res) => {




    const { nombre} = req.params;
  



        const medico = await Medico.findOne({ nombre })
                
        res.json({
            ok: true,
            medico
        })
        console.log('nombreee'+nombre);

        console.log('medicooo'+medico);

}

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre img');
    
        res.json({
            ok: true,
            medico
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        
        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
const createDoctor = async(req, res = response) => {

    const obj =JSON.stringify(req.body);
    console.log( 'im on tthe register controler'+obj );

    const { dni } = req.body;

    try {

     //   const existeDni = await Usuario.findOne({ dni });
/*
        if ( existeDni ) {
            return res.status(400).json({
                ok: false,
                msg: 'El dni ya está registrado'
            });
        }
        */

        const medico = new Medico( req.body );
        console.log( 'pasoo' );

    
    
        // Guardar usuario
        await medico.save();




        res.json({
            ok: true,
            medico
            
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


const actualizarMedico = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );


        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMedico = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Médico borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



module.exports = {
    getMedicos2,
    getDni,
    getDni2,
    crearMedico,
    createDoctor,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}