<template>
  <v-footer
    color="white"
    absolute
    inset
    app
    height="150"
    width="auto"
    class="py-4 font-weight-medium"
    padless
  >
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-img :src="require('@/assets/images/unicor.png')" />
        </v-col>
        <v-col cols="10">
          <v-card flat tile class="white--text text-center pa-3">
            <v-card-text class="black--text pt-0 text-justify"
              >Este STI es utilizado en el programa de enfermería de la
              Universidad de Córdoba-Colombia para el proceso de enseñanza de
              los protocolos asistenciales para el diagnóstico precoz de la
              sífilis gestacional y congénita.</v-card-text
            >
            <v-divider></v-divider>
            <v-card-text class="black--text">
              Contacto: proyectosifilisenfermeria@correo.unicordoba.edu.co
            </v-card-text>
          </v-card>
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
</style>
