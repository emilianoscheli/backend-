const Usuario = require('../models/usuario');
const Estudio = require('../models/estudio');

const fs = require('fs');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo, pdf) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if ( !medico ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        break;
        
        case 'usuarios':

            const estudio = await Estudio.findById(id);
            if ( !estudio ) {
                console.log('No es un estudio por id');
            }            else  console.log('Si es un  estudio por id');

            
       //     if ( !usuario ) {
             //   console.log('No es un usuario por id');
           //     return false;
         //   }
       
          //  const usuario = await Usuario.findById(id);


         //   pathViejo = `./uploads/hospitales/${ usuario.img }`;
           // borrarImagen( pathViejo );

           //var myData = []; 
           // w  ww. j a va  2  s.  c  o  m
          // arr3.push(1); // add at the end 
        //   var arr3 = [ 'cat', 'rat', 'bat' ];


           // usuario.img = nombreArchivo;
           // usuario.dni=dni;
            //usuario.ima.push(nombreArchivo);
            if (pdf==true) {
                estudio.pd.push(nombreArchivo);

            }
            else{
                estudio.ima.push(nombreArchivo);

            }

            await estudio.save();

            //await usuario.save();
            return true;

        break;
    }


}

module.exports = { 
    actualizarImagen
}
