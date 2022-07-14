//Por favor Laura no toca! 🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️
// Lib imports
import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

// Routes
import paths from './paths';

//store
import state from '../store/state'

function route(path, view, name, meta) {
  return {
    name: name || view,
    path,
    component: resolve => import(`@/pages/${view}.vue`).then(resolve),
    meta: meta || null
  };
}

Vue.use(Router);

// Create a new router
const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name, path.meta)).concat([
    { path: '*', redirect: '/' },
  ]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});

Vue.use(Meta);

router.beforeEach((to, from, next) => {
  document.title = 'Sistema Tutor Inteligente'
  if (to.meta.Auth && state.isLoggedIn === false) {
    next({ path: '/login' })
  } else {
    if (to.meta.rol) {
      if(state.user && to.meta.rol.some(r => state.user.roles.indexOf(r) >= 0)){
        next()
        return
      } else {
        next({ path: '/404' })
      }
    } else {
      next()
    }
  }
})


export default router;
