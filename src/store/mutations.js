// https://vuex.vuejs.org/en/mutations.html
export default {
    setToken: (state, token) => {
      state.token = token
    },
    setUser: (state, user) =>  { 
      state.user = user, state.isLoggedIn = true
    },
    logout: (state) => { 
      state.user = {}, state.isLoggedIn = false 
    },
    setLinks: (state, rol) => {
      if(rol == "ROLE_USER"){
        state.links = [
          {
            name: "Notificaciones",
            path: '/messages',
            icon: 'mdi-bell'
          },
          {
            name: 'Perfil',
            path: '/profile',
            icon: 'mdi-account-circle'
          },
        ];
      } else if(rol == "ROLE_ADMIN"){
        state.links = [
          {
            name: 'Usuarios',
            path: '/admin/users',
            icon: 'mdi-account-box-multiple'
          },
      ];
      } else if(rol == "ROLE_MODERATOR"){
        state.links = [
          {
            name: "Mis Cursos",
            path: '/moderator',
            icon: 'mdi-human-male-board'
          },
          {
            name: "Mis Estudiantes",
            path: '/moderator/student',
            icon: 'mdi-account-circle'
          },
          {
            name: "Mis Cuestionarios",
            path: '/moderator/interview',
            icon: 'mdi-clipboard-list'
          },
          // {
          //   name: 'Perfil',
          //   path: '/profile',
          //   icon: 'mdi-account-circle'
          // },
        ];
      }
    }
  };
  