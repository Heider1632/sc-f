<template>
  <v-footer
    color="white"
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
                Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut,
                faucibus non, euismod id, nulla. Fusce convallis metus id felis
                luctus adipiscing. Aenean massa. Vestibulum purus quam.
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
