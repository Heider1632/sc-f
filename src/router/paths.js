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
    //MODERATOR ROUTES
    {
      path: '/moderator',
      name: 'Bienvenido Profesor',
      view: 'moderator/Home',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
    {
      path: '/moderator/student',
      name: 'Estudiantes Profesor',
      view: 'moderator/Student',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
    {
      path: '/moderator/interview',
      name: 'Cuestionarios Profesor',
      view: 'moderator/Interview',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
    {
      path: '/moderator/course/:id/students',
      name: 'Estudiantes Curso Profesor',
      view: 'moderator/Course/Students',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
    {
      path: '/moderator/course/:id/lessons',
      name: 'Lecciones Curso Profesor',
      view: 'moderator/Course/Lessons',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
    {
      path: '/moderator/course/:id/lessons/:form',
      name: 'Formulatio Lecciones Curso Profesor',
      view: 'moderator/Course/FormLesson',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
    {
      path: '/moderator/course/:course/lesson/:lesson/structure',
      name: 'Estructura Leccion Curso Profesor',
      view: 'moderator/Course/Structure',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
    {
      path: '/moderator/course/:id/statistics',
      name: 'Estadisticas Curso Profesor',
      view: 'moderator/Course/Statistics',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
    {
      path: '/moderator/course/:id/questionnaire',
      name: 'Cuestionario Curso Profesor',
      view: 'moderator/Course/Questionnaire',
      meta: {
        Auth: true, rol: [ 'ROLE_MODERATOR' ]
      }
    },
];