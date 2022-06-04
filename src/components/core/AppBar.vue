<template>
    <v-app-bar id="core-app-bar" fixed app elevate-on-scroll color="white" flat >
        <v-container class="py-0 fill-height">

            <img class="mr-3 hidden-sm-and-down" :src="require('@/assets/images/logo-its.png')" height="40"/>

             <img class="mr-3 hidden-xs" :src="require('@/assets/images/unicordoba-header.png')" height="40"/>

            <v-spacer></v-spacer>

            <v-menu>
                <template v-slot:activator="{ on }">
                    <v-btn text class="purple--text display-5" v-on="on">
                        <v-avatar color="orange" class="white--text ml-4" size="35">
                            {{ name.split(' ')[0].charAt(0) }}{{ name.split(' ')[1].charAt(0) }}
                        </v-avatar>
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
            if(this.user.roles.includes('ROLE_USER')) {
                return  `${this.user.name} ${this.user.lastname}`
            } else if(this.user.roles.includes('ROLE_MODERATOR')) {
                return "Profesor STI"
            } else {
                return "Administrador STI"
            }
        },
        learningStyleDimensions(){
            return this.user.learningStyleDimensions.map((ls) => ls.name);
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

html {
    font-size: 90%;
    @media only screen and (min-width: 600px) {
        font-size: 50%;
    }
    @media only screen and (min-width: 1000px) {
        font-size: 98%;
    }
    @media only screen and (min-width: 1200px) {
        font-size: 100%;
    }
}
</style>