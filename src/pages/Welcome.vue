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
          <h1 class="display-5">¡Bienvenidos a tu tutor virtual!</h1>
          <p class="justify-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
            voluptate quo aliquid, sapiente doloremque facilis odio aliquam?
            Dicta ea fugit sunt quis! Ea, repudiandae? Voluptatibus sed quae vel
            aspernatur corrupti.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
            voluptate quo aliquid, sapiente doloremque facilis odio aliquam?
            Dicta ea fugit sunt quis! Ea, repudiandae? Voluptatibus sed quae vel
            aspernatur corrupti.
          </p>
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="12">
            <video-embed css="embed-responsive-21by9" src="https://www.youtube.com/watch?v=YBKB6Dusubo"></video-embed>
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
