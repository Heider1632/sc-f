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
        <v-col lg="6" md="6" sm="12" xs="12">
          <p class="subtitle-1 white--text mt-8">
            Este sistema cognitivo es utilizado en el programa de enfermería de la Universidad de Córdoba-Colombia para el proceso de enseñanza de los protocolos asistenciales para el diagnóstico precoz de la sífilis gestacional y congénita.
          </p>
        </v-col>
        <v-col lg="6" md="6" sm="12" xs="12" class="d-flex align-center">
          <h2 class="blue--text">EDUTLAN</h2>
          <v-img width="20" height="60"  :src="require('@/assets/images/logo-huellas.png')" />
          <v-img width="20"  :src="require('@/assets/images/logo-its.png')" />
          <v-img width="20"  :src="require('@/assets/images/unicor.png')" />
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
