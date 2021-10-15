export default [
    {
      path: '/',
      name: 'Bienvenido a STI',
      view: 'user/Home',
      meta: {
        Auth: true, rol: [ 'ROLE_USER' ]
      }
    },
    {
      path: '/course/:id',
      name: 'Mi Curso',
      view: 'user/Course',
      meta: {
        Auth: true, rol: [ 'ROLE_USER' ]
      }
    },
    {
      path: '/course/:course/lesson/:lesson',
      name: 'Mi Unidad',
      view: 'user/Lesson',
      meta: {
        Auth: true, rol: [ 'ROLE_USER' ]
      }
    },
    {
      path: '/test',
      name: 'Test Felderman',
      view: 'user/Test',
      meta: {
        Auth: true, rol: [ 'ROLE_USER' ]
      }
    },
    {
      path: '/login',
      name: 'Iniciar',
      view: 'Login',
      meta: {
        Auth: false
      }
    },
    {
      path: '/Home-its',
      name: 'Inicio ITS',
      view: 'Home-its',
    },
    {
      path: '/register',
      name: 'Registrate',
      view: 'Register',
      meta: {
        Auth: false
      }
    },
    //ADMIN ROUTES
    {
      path: '/admin',
      name: 'Bienvenido Admin',
      view: 'admin/Home',
      meta: {
        Auth: true, rol: [ 'ROLE_ADMIN' ]
      }
    },
    {
      path: '/admin/users',
      name: 'Usuarios (admin)',
      view: 'admin/Users',
      meta: {
        Auth: true, rol: [ 'ROLE_ADMIN' ]
      }
    },
    //MODERATOR(TEACHER) ROUTES
    {
      path: '/moderator',
      name: 'Bienvenido Moderator',
      view: 'moderator/Home',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
    {
      path: '*',
      name: 'Pagina No Encontrada',
      view: 'NotFound',
      meta: {
        Auth: false
      }
    },
];