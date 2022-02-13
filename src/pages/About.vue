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
        <v-col cols="12" lg="6" md="6" sm="12">
          <h1 class="display-5">Acerca del Tutor inteligente</h1>
          <p class="justify-text">
            El STI Fichas y protocolos en salud, es una iniciativa innovadora
            para ofrecer enseñanza individualizada a estudiantes del área de las
            Ciencias de la Salud, especialmente Enfermería, en temas de interés
            y alto impacto en Salud Pública. En la actual versión del sistema,
            estará disponible para estudiantes del programa de Enfermería de la
            Universidad de Córdoba, en cursos específicos en los que se requiera
            la profundización sobre este tipo de contenidos. En este espacio,
            tendrás acceso a los contenidos diseñandos para la apropiación de
            los conocimientos sobre el protocolo de atención para la detección
            temprana de Sífilis Gestacional y congénita. Para acceder al
            sistema, el estudiante debe tener las credenciales suministradas a
            través de su correo electrónico. Esperamos que disfruten de esta
            experiencia de aprendizaje, que es de gran importancia e interés
            para los profesionales del área de la salud.
          </p>
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="12">
          <video-embed
            css="embed-responsive-21by9"
            src="https://www.youtube.com/watch?v=YBKB6Dusubo"
          ></video-embed>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import AppBarDefault from "@/components/core/AppBarDefault";
export default {
  name: "About",
  components: {
    AppBarDefault,
  },
};
</script>
