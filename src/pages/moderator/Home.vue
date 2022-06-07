<template>
  <v-main class="grey lighten-3">
    <app-bar></app-bar>

    <v-container fill-height>
      <v-row>
        <v-col class="mb-4" cols="8">
          <v-layout row wrap justify-space-around>
            <v-text-field
              v-model="search"
              dense
              flat
              rounded
              solo-inverted
              append-icon="search"
              @click:append="searchCourse"
            ></v-text-field>
          </v-layout>
        </v-col>

        <v-col class="mb-4" cols="4">
          <v-btn text color="primary" @click="downloadExcel"
            >Descargar Excel</v-btn
          >
        </v-col>

        <v-card flat rounded v-for="(course, index) in courses" :key="index">
          <v-card-title>{{ course.name }}</v-card-title>

          <v-card-subtitle>{{ course.description }}</v-card-subtitle>

          <v-list rounded>
            <v-subheader>UNIDADES</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item
                v-for="(lesson, i) in course.lessons"
                :key="i"
                @click="selectedItem = i"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="lesson.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-card-actions class="mt-4">
            <v-btn
              text
              color="primary"
              @click="$router.push(`/moderator/course/${course._id}/students`)"
              >Estudiantes</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="$router.push(`/moderator/course/${course._id}/lessons`)"
              >Unidades</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="
                $router.push(`/moderator/course/${course._id}/statistics`)
              "
              >Estadisticas</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import { mapState } from "vuex";
import zipcelx from "zipcelx";

export default {
  name: "HomeTeacher",
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
    async downloadExcel() {
      var response = await this.$http("/data/all");

      console.log(response);

      if (response.data) {
        const config = {
          filename: "report",
          sheet: {
            data: [
              [
                { 
                  value: "Nombre",
                  type: "string"
                },
                { 
                  value: "Curso",
                  type: "string"
                },
                { 
                  value: "Unidad",
                  type: "string"
                },
                { 
                  value: "Peso Euclideano",
                  type: "string"
                },
                { 
                  value: "Usos",
                  type: "string"
                },
                { 
                  value: "Exitoso",
                  type: "string"
                },
                { 
                  value: "Errado",
                  type: "string"
                },
                { 
                  value: "Caso",
                  type: "string"
                },
                { 
                  value: "Nota",
                  type: "string"
                }
              ],
              ...response.data
            ],
          },
        };

        zipcelx(config);
      }
    },
    getCourses() {
      this.loading = true;
      this.$http
        .get(`/course/teacher/${this.user.id}`)
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.courses = response.data;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error.message);
        });
    },
  },
};
</script>
