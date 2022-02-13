<template>
    <v-app-bar id="core-app-bar" fixed app color="white" flat >
        <v-container class="py-0 fill-height">

            <img class="mr-3" :src="require('@/assets/images/logo-its.png')" height="40"/>

            <img class="mr-3" :src="require('@/assets/images/unicordoba-header.png')" height="40"/>

            <v-spacer></v-spacer>

            <v-btn v-if="$route.path != '/about'" elevation="0" color="purple" @click="$router.push('/login')" class="white--text display-5 mx-2">
                Iniciar Sesión
            </v-btn>

            <v-btn v-if="$route.path != '/about'" elevation="0" color="purple" @click="$router.push('/about')" class="white--text display-5 mx-2">
                Acerca
            </v-btn>

            <v-btn v-if="$route.path == '/about'" elevation="0" color="purple" @click="$router.push('/')" class="white--text display-5">
                Inicio
            </v-btn>
        </v-container>
    </v-app-bar>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'AppBarDefault',
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
</style>