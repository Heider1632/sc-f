<template>
  <v-footer
    color="grey lighten-5"
    absolute
    app
    height="auto"
    width="auto"
    class="ma-0 pa-0"
    padless
  >
    <v-container>
      <v-row>
        <v-col lg="6" md="6" sm="12" xs="12">
          <p class="subtitle-1 black--text mt-8">
            Este sistema cognitivo es utilizado en el programa de enfermería de la Universidad de Córdoba-Colombia para el proceso de enseñanza de los protocolos asistenciales para el diagnóstico precoz de la sífilis gestacional y congénita.
          </p>
        </v-col>
        <v-col lg="6" md="6" sm="12" xs="12" class="d-flex align-center">
          <h1 class="blue--text">EDUTLAN</h1>
          <v-img width="60"  :src="require('@/assets/images/logo-huellas.png')" />
          <v-img width="60"  :src="require('@/assets/images/logo-its.png')" />
          <v-img width="60"  :src="require('@/assets/images/unicor.png')" />
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
