<template>
    <v-app-bar id="core-app-bar" fixed app elevate-on-scroll color="primary" flat >
        <v-container class="py-0 fill-height">

            <img class="mr-3" :src="require('@/assets/logo.png')" height="40"/>

            <!-- <v-toolbar-title class="white--text font-weight-semibold align-self-center mr-4">
                {{ user.name }} {{ user.lastname }}
            </v-toolbar-title> -->

            <v-spacer></v-spacer>

            <!-- <template v-if="!responsive">
                <v-btn
                    v-for="(link, index) in links"
                    :key="`link--${index}`"
                    @click="go(link.path)"
                    text
                    class="white--text"
                >
                    {{ link.name }}
                    <v-icon v-if="link.icon">{{ link.icon }}</v-icon>
                </v-btn>

                <v-btn class="white--text" text @click="salir">
                    Salir
                    <v-icon>mdi-account-arrow-left</v-icon>
                </v-btn>
            </template> -->

            <v-menu >
                <template v-slot:activator="{ on }">
                    <v-btn text class="white--text display-5" v-on="on">
                        {{ name }}
                    </v-btn>
                </template>

                <v-list >
                    <v-list-item v-for="(link, index) in links" :key="`resposive--link--${index}`" :to="link.path">
                        <v-list-item-title>{{ link.name }}</v-list-item-title>
                        <v-icon v-if="link.icon">{{ link.icon }}</v-icon>
                    </v-list-item>

                    <v-list-item @click="salir">
                        <v-list-item-title>Salir</v-list-item-title>
                        <v-icon>mdi-account-arrow-left</v-icon>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-container>
    </v-app-bar>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'AppBar',
    data:() => ({
        responsive: false,
    }),
    mounted(){
        this.onResponsiveInverted();
        window.addEventListener("resize", this.onResponsiveInverted);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResponsiveInverted);
    },
    computed: {
        ...mapState(['user', 'links']),
        name() {
            if(this.user.name && this.user.lastname) {
                return  `${this.user.name} ${this.user.lastname}`
            } else {
                return "Admin STI"
            }
        }
    },
    methods: {
        ...mapActions(['salir']),
        onResponsiveInverted() {
            if (window.innerWidth < 649) {
                this.responsive = true;
            } else {
                this.responsive = false;
            }
        },
        go(path){
            this.$router.push(path);
        }
    }
}
</script>
<style>
#core-app-bar {
  width: auto;
}

#core-app-bar a {
  text-decoration: none;
}
</style>