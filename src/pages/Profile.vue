<template>
  <v-main>
    <v-container fill-height class="section-container">
      <v-layout row wrap>
        <v-flex xs12 mb-2>
          <v-toolbar dense flat>
            <v-btn
              color="purple"
              dark
              elevation="0"
              class="mb-4 mt-4 mr-4"
              @click="$router.go(-1)"
            >
              <v-icon small>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title>Perfil</v-toolbar-title>
          </v-toolbar>
        </v-flex>

        <v-flex xs12 sm12>
          <v-card class="section-card" flat fill-width>
            <v-card-text>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <v-card class="section-card" flat color="primary">
                      <v-card-title>
                        <h1 class="headline white--text">
                          Información Personal
                        </h1>
                      </v-card-title>
                      <v-card-text>
                        <p class="subtitle-2 white--text">
                          Nombre: {{ user.name }} {{ user.lastname }}
                        </p>
                        <p class="subtitle-2 white--text">
                          Estilo de Aprendizaje:
                          {{ learningStyle(user.learningStyleDimensions) }}
                        </p>
                        <p class="subtitle-2 white--text">
                          Correo: {{ user.email }}
                        </p>
                        <p class="subtitle-2 white--text">Semestre: V</p>
                        <p class="subtitle-2 white--text">
                          Programa: Enfermería
                        </p>
                        <p class="subtitle-2 white--text">
                          Insitución: Universidad de Cordoba
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 mb-8>
          <v-data-table
            :headers="headers"
            :items="data"
            disable-pagination
            hide-default-footer
          >
            <template v-slot:[`item.complete`]="{ item }">
              <v-chip :color="getColor(item.complete)" dark>
                {{ item.complete ? "Completado" : "En Progreso" }}
              </v-chip>
            </template>
          </v-data-table>
          <v-toolbar dense flat>
            <v-toolbar-title>Tiempo Restante:</v-toolbar-title>
            <p class="display-5 mt-5 pa-3">
              {{ total }} / 24 (info adicional: para completar esta experiencia
              de aprendizaje debes dedicar un mínimo de 24 horas)
            </p>
          </v-toolbar>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-main>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  data: () => ({
    total: 0,
    headers: [
      {
        text: "Descripción",
        align: "start",
        sortable: false,
        value: "lesson.title",
      },
      { text: "Estado", value: "complete" },
    ],
    data: [
      {
        description: "Unidad 1",
        status: "Completado",
      },
      {
        description: "Unidad 2",
        status: "Completado",
      },
      {
        description: "Unidad 3",
        status: "Completado",
      },
      {
        description: "Unidad 4",
        status: "Completado",
      },
    ],
  }),
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.lessons();
    this.totalStudent();
  },
  methods: {
    learningStyle(learningStyleDimensions) {
      let ls = learningStyleDimensions.map((ls) => ls.name);
      return ls
        .join(", ")
        .replace("reflective", "Reflectivo")
        .replace("sensiting", "Sensitivo")
        .replace("intuitive", "Intuitivo")
        .replace("visual", "Visual")
        .replace("active", "Activo")
        .replace("verbal", "Verbal")
        .replace("sequiential", "Secuencial");
    },
    getColor(active) {
      if (!active) return "red";
      else return "green";
    },
    convertHMS(value) {
      const sec = parseInt(value, 10); // convert value to number if it's string
      let hours = Math.floor(sec / 3600); // get hours
      let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
      let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
    },
    totalStudent() {
      this.$http
        .get("/trace/total/", { params: { student: this.user.student_id } })
        .then((response) => {
          this.total = this.convertHMS(response.data.total);
        });
    },
    lessons() {
      this.$http
        .get("/progress/status/", { params: { student: this.user.student_id } })
        .then((response) => {
          this.data = response.data.sort(
            (a, b) => a.lesson.order - b.lesson.order
          );
        });
    },
  },
};
</script>
