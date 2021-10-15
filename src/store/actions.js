import router from '../router'
import jwtDecode from 'jwt-decode';
export default {
  autoLogin ({ commit }) {
    let token = localStorage.getItem('token');
    if (token) {
      let user = jwtDecode(token)
      commit('setToken', token)
      commit('setUser', user)

      //handle roles
      if(user.roles.includes('ROLE_ADMIN')){
        commit('setLinks', "ROLE_ADMIN")
        router.push("/admin");
      } else if(user.roles.includes('ROLE_MODERATOR')){
        commit('setLinks', "ROLE_MODERATOR")
        router.push("/moderator");
      } else if(user.roles.includes('ROLE_USER')){
        commit('setLinks', "ROLE_USER")
        router.push("/test");
      }

    }
  },
  salir ({ commit }) {
    commit('setToken', null)
    commit('setUser', {})
    commit('logout')
    localStorage.removeItem('token')
    router.push('/login')
  }
};