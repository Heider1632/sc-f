<template>
  <v-main>
    <app-bar-default />
    <v-toolbar
      flat
      dark
      prominent
      :src="require('@/assets/images/sifilis.jpg')"
    >
    </v-toolbar>
    <v-container fluid>
      <v-row class="py-12 mx-auto">
        <v-col cols="12" lg="6" md="6" sm="12" align-self="center">
          <h1 class="display-5">¡Bienvenidos a tu sistema recomendador!</h1>
          <p class="justify-text">
            Fichas y protocolos en salud es un Sistema Tutor Inteligente 
            que busca proporcionar formación individualizada a estudiantes de 
            Enfermería en Protocolos de atención de sífilis gestacional y congénita.
          </p>
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="12">
          <video-embed
            css="embed-responsive-21by9"
            src="https://www.youtube.com/watch?v=XIzFFfoxd40"
          ></video-embed>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import AppBarDefault from "@/components/core/AppBarDefault";
export default {
  name: "Welcome",
  components: {
    AppBarDefault,
  },
};
</script>
