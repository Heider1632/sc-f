<template>
  <v-footer absolute inset app height="100" width="auto" class="py-12">
    <v-container>
      <v-row>
        <v-col lg="2" md="3" cols="12">
          <v-img :src="require('@/assets/images/unicor.png')" />
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
