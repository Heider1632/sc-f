import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import es from 'vuetify/lib/locale/es';
import colors from 'vuetify/lib/util/colors';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: 'md',
  lang: {
    locales: { es },
    current: 'es',
  },
  theme: {
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.white,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
  // theme: {
  //   light: {
  //     primary: "#3f51b5",
  //     secondary: "#9c27b0",
  //     accent: "#e91e63",
  //     error: "#f44336",
  //     warning: "#ff9800",
  //     info: "#03a9f4",
  //     success: "#8bc34a"
  //   }
  // }
});
