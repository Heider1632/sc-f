// https://vuex.vuejs.org/en/state.html
import createPersistedState from 'vuex-persistedstate'

export default {
  plugins: [createPersistedState()],
  token: null,
  user: {},
  isLoggedIn: false,
  links: null
};
