<template>
  <v-footer
    color="#595959"
    absolute
    app
    height="auto"
    width="auto"
    padless
  >
    <v-container>
      <v-row>
        <v-col lg="4" md="4" sm="12" xs="12">
          <v-img class="hidden-sm-and-down" width="200" :src="require('@/assets/images/logo-its.png')" />
          <p class="subtitle-2 white--text">
            Este STI es utilizado en el programa de enfermería de la Universidad de Córdoba-Colombia para el proceso de enseñanza de los protocolos asistenciales para el diagnóstico precoz de la sífilis gestacional y congénita.
          </p>
        </v-col>
        <v-col lg="4" md="4" sm="12" xs="12" class="mt-3 d-block align-center justify-space-evenly">

          <h5 class="border-one pa-2 white--text caption">Correo: proyectosifilisenfermeria@correo.unicordoba.edu.co</h5>
          <h5 class="border-two pa-2 white--text caption">Dirección: Carrera 6 No. 77- 305 Montería - Córdoba, Colombia</h5>
          <h5 class="border-three pa-2 white--text caption">Institución: Universidad de Córdoba, Colombia</h5>
        </v-col>
        <v-col lg="4" md="4" sm="12" xs="12" class="d-flex align-center">
          <v-img width="80" class="hidden-sm-and-down" :src="require('@/assets/images/logo-huellas.png')" />
          <v-img width="80" class="hidden-sm-and-down" :src="require('@/assets/images/unicor.png')" />
          <v-img width="80" class="hidden-sm-and-down" :src="require('@/assets/images/unicor.png')" />
          
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  name: "AppFooter",
};
</script>
<style lang="scss" scoped>
.theme--light.v-divider {
  border-color: rgba(247, 0, 255, 0.24) !important;
}

.border-one{
  border-left: 3px solid #EBBF4B;
}

.border-two{
  border-left: 3px solid purple;
}
.border-three{
  border-left: 3px solid green;
}
</style>
