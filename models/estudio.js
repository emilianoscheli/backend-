const { Schema, model } = require('mongoose');

const EstudioSchema = Schema({

    dni: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: false,
        required: false,
      },

    nombreDni: {
        type: String,
        required: false,
       
    },
    apellidoDni: {
        type: String,
        required: false,
       
    },
        dni2: {
        type: String,
        required: false
    },

    nombreDni2: {
        type: String,
        required: false,
       
    },
    apellidoDni2: {
        type: String,
        required: false,
       
    },
  
    fecha: {
        type: Date,
        required: false,
     
    },
    fecha2: {
        type: String,
        required: false,
     
    },

    img: {
        type: String,
    },
    ima: [String ]
    ,
    pd: [String ]
    ,
    descripE: {
        type: String,
    },

    /*

    apellido: {
        type: String,
        required: false,
        unique: true
    },
    telefono: {
        type: String,
        required: false,
        unique: true
    },
    img: {
        type: String,
    },

     */

}, {  collection: 'estudios' });


EstudioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})




module.exports = model( 'Estudio', EstudioSchema );
