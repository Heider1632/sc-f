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
          <h1 class="display-5">¡Bienvenidos a tu tutor virtual!</h1>
          <p class="justify-text">
            Fichas y protocolos en salud es un Sistema Tutor Inteligente (STI)
            desarrollado por los grupos de investigación Huellas y EDUTLAN de la
            Universidad de Córdoba. Con el objetivo de proporcionar formación
            individualizada a estudiantes y profesionales de Enfermería en
            Protocolos de atención de sífilis gestacional y congénita. Este STI
            fue desarrollado en el marco del proyecto de investigación:
            “Desarrollo de un Sistema Tutor Inteligente para el aprendizaje del
            protocolo de atención temprana de sífilis gestacional y congénita”
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
