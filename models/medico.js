const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: false
    },
    apellido: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    
});


MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Medico', MedicoSchema );
