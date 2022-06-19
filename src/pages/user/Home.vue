<template>
  <v-main class="white">
    <app-bar></app-bar>

    <template v-if="loading">
      <v-container fill-height>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="4">
            <material-loader></material-loader>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <template v-if="courses.length > 0">
        <v-container>
          <v-row>
            <v-col cols="6" align-self="center">
              <h1 class="pa-2 subtitle">
                Curso: {{ courses[0] ? courses[0].name : "" }}
              </h1>
            </v-col>

            <v-col cols="6">
              <v-sheet class="main-border">
                <h1 class="pa-2 subtitle">Acerca del curso</h1>
                <p class="pa-2 subtitle-2 text-justify">
                  El Sistema tutor inteligente te ofrecerá una secuencia de
                  aprendizaje personalizada de acuerdo a tus estilos de
                  aprendizaje detectados en el test anterior. Mediante esta
                  herramienta accederás a los contenidos del curso Protocolos de
                  atención para la detección temprana de sífilis gestacional y
                  congénita, el cual se divide en cuatro unidades que podrás ver
                  a continuación. El tiempo de dedicación al curso será de 24
                  horas mínimo.
                </p>

                <p class="pa-2 subtitle-2 text-justify">
                  Esperamos que disfrutes de esta experiencia de aprendizaje y
                  que una vez terminada puedas poner en práctica los
                  conocimientos adquiridos.
                </p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-else>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="4">
            <material-image name="deny" type="svg"></material-image>
            <p class="text-body-1 font-weight-bold">
              No tienes cursos, espera a que un profesor te matricule.
            </p>
          </v-col>
        </v-row>
      </template>
    </template>
  </v-main>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "HomeStudent",
  data: () => ({
    search: "",
    selectedItem: 0,
    loading: true,
    courses: [],
  }),
  mounted() {
    this.getCourses();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    go(route) {
      this.$router.push(route);
    },
    searchCourse() {
      console.log("hola");
    },
    getCourses() {
      this.loading = true;
      this.$http
        .get(`/course/student/${this.user.id}`)
        .then((response) => {
          this.loading = false;
          this.courses = response.data;
            if (this.courses.length == 1) {
              this.$router.push(`/course/${this.courses[0]._id}`);
            }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.border {
  border-left: 6px solid purple;
}

.tile {
  margin: 5px;
  border-radius: 4px;
  background-color: #03a9f4;
  color: white;
}

.main-border {
  border-left: 8px solid #ebbf4b;
}

.main-course {
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.3) 100%
    ),
    url("~@/assets/images/fondo-u2.jpeg") left no-repeat;
  background-size: 100%;
  background-attachment: fixed;
}

.main-border {
  border-left: 3px solid #ebbf4b;
}

.main-course {
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.3) 100%
    ),
    url("~@/assets/images/Fondo-STI-3.jpeg") left no-repeat;
  background-size: 100%;
  background-attachment: fixed;
}
</style>
