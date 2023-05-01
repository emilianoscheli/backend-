/*
const getMenuFrontEnd = (role = 'USER_ROLE') => {

  const menu = [
      {
        titulo: 'Dashboard',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Cargar de estudio', url: 'Cargar-estudio' },
          { titulo: 'Cargar paciente', url: 'Cargar-paciente' },

         
    
        ]
      },
  
      {
        titulo: 'Mantenimientos',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
          // { titulo: 'Usuarios', url: 'usuarios' },
          //{ titulo: 'Hospitales', url: 'hospitales' },
          //{ titulo: 'Médicos', url: 'medicos' },
          { titulo: 'Cargar paciente', url: 'cargar-datos' },
      //    { titulo: 'filee', url: 'filee' },


        ]
      },
    ];

  if ( role === 'ADMIN_ROLE' ) {
      menu[1].submenu.unshift({ titulo: 'Estudios', url: 'usuarios' })
      //menu[2].submenu.unshift({  titulo: 'Mis estudios', url: 'estudios' })

  }

  return menu;
}

module.exports = {
  getMenuFrontEnd
}
*/


const getMenuFrontEnd = (role = 'USER_ROLE') => {

  const menu = [
      {
        titulo: 'Dashboard',
        icono: 'mdi mdi-gauge',
        submenu: [       
        ]
      },
  
      {
        titulo: 'Acciones',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [


        ]
      },
    ];

  if ( role === 'ADMIN_ROLE' ) {
            menu[1].submenu.unshift({  titulo: 'Cargar paciente', url: 'Cargar-paciente' }),
            menu[1].submenu.unshift({ titulo: 'Actualizar contraseña', url: 'claves' }),
            menu[1].submenu.unshift({ titulo: 'Mis estudios', url: 'estudios' }),
            menu[1].submenu.unshift({  titulo: 'Cargar estudio', url: 'Cargar-estudio' })




  }

  return menu;
}

module.exports = {
  getMenuFrontEnd
}
