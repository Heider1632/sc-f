<template>
  <v-app>

    <!-- pass to component -->
    <v-snackbar
      v-model="snackbar"
      :bottom="bottom"
      :color="color"
      :left="left"
      :right="right"
      :top="top"
      :timeout="3000"
      dark
      shaped
    >
      <div>{{ message }}<b> {{ submessage }}</b> </div>
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          icon
          @click="hidden_notication"
        >
          <v-icon>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <router-view />

    <app-footer></app-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: 'App',
  metaInfo() {
    return {
      title: 'ITS',
    };
  },
  mounted(){
    this.autoLogin();
  },
  computed: {
    ...mapState('notification', ['snackbar', 'color', 'top', 'bottom', 'right', 'left', 'message', 'submessage'])
  },
  watch: {
    snackbar(val){
      let $this = this;
      if(val){
        setTimeout(function(){
          $this.hidden_notication()
        }, 2000)
      }
    }
  },
  methods: {
    ...mapMutations('notification', ['dismiss']),
    ...mapActions(['autoLogin']),
    hidden_notication(){
      this.dismiss()
    }
  }
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');
@import url('https://fonts.googleapis.com/css? family=Comfortaa&display=swap');

$body-font-family: 'Poppins';
$title-font: 'Poppins';

.v-application {
  font-family: $body-font-family, sans-serif !important;
  .title { // To pin point specific classes of some components
    font-family: $title-font, sans-serif !important;
  }
}
</style>
