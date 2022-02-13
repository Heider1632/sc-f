<template>
  <v-footer
    color="gray"
    absolute
    inset
    app
    height="150"
    width="auto"
    class="py-4"
  >
    <v-container>
      <v-row>
        <v-col lg="2" md="3" cols="3">
          <v-img :src="require('@/assets/images/unicor.png')" />
        </v-col>
        <v-col lg="10" md="9" cols="9">
          <v-row class="mx-auto">
            <v-col>
              <v-divider vertical light class="mx-auto"></v-divider>
            </v-col>
            <v-col>
              <p class="text-justify black--color">
                Acerca del proyecto Política de privacidad Universidad de
                Córdoba Campus virtual
              </p>
            </v-col>
            <v-col>
              <v-divider vertical light class="mx-auto"></v-divider>
            </v-col>
            <v-col>
              <p class="text-justify black--color">
                Este STI es utilizado en el programa de enfermería de la
                Universidad de Córdoba-Colombia para el proceso de enseñanza de
                los protocolos asistenciales para el diagnóstico precoz de la
                sífilis gestacional y congénita.
              </p>
              <p>
                Contacto:
                <span>
                  proyectosifilisenfermeria@correo.unicordoba.edu.co
                </span>
              </p>
            </v-col>
          </v-row>
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
