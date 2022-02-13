<template>
  <v-main class="grey lighten-3">
    <app-bar></app-bar>

    <v-container fill-height>
      <template v-if="loading">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="4">
            <material-loader></material-loader>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <v-col cols="12">
            <v-toolbar flat rounded>
              <v-toolbar-title>
                <p class="font-weight-semibold display-5 mb-1">
                    Panel Personal
                </p>
              </v-toolbar-title>

              <v-divider class="mx-2" inset vertical></v-divider>

              <div class="flex-grow-1"></div>
            </v-toolbar>
          </v-col>

          <v-col cols="8">
            <v-sheet rounded="lg">
              <v-list rounded color="transparent">

                <v-list-item color="primary">
                  <v-list-item-content>
                    Curso: {{ course ? course.name : "" }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item
                    v-for="(lesson, index) in course ? course.lessons : []"
                    :key="index"
                    link
                    :disabled="progress[index].isActive"
                  >
                    <v-list-item-content>
                      <v-list-item-icon v-if="progress[index].isActive">
                        <v-icon>mdi-disable</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>
                        {{ types[lesson.type] }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ lesson.title }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon @click="goLesson(lesson._id)">
                        <v-icon
                          v-if="!progress[index].isActive"
                          color="grey lighten-1"
                          >mdi-arrow-right</v-icon
                        >
                        <v-icon v-else color="grey lighten-1">mdi-lock</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>

                <v-divider class="my-2"></v-divider>

                <v-list-item color="grey lighten-4" @click="getCourse">
                  <v-list-item-icon>
                    <v-icon>refresh</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title> Actualizar </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="4">
            <v-sheet rounded="lg">
              <v-list rounded color="transparent">
                <v-list-item color="primary">
                  <v-list-item-content>
                    <v-list-item-title> Información general </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                 <v-list-item color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Programa del curso </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                 <v-list-item color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Metodología </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                 <v-list-item color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Referencias </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <br>

                <v-list-item color="primary">
                  <v-list-item-content>
                    <v-list-item-title> Estudiantes </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> ¿Necesitas ayuda con el sistema? </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Más recursos educativos </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </template>
    </v-container>

    <v-footer>
      <h1>Universidad de Cordoba</h1>
    </v-footer>
  </v-main>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Course",
  data: () => ({
    rating: 0,
    selectedItem: 0,
    loading: false,
    course: null,
    types: {
      introduction: "Introducción",
      definition: "Definición",
      example: "Ejemplo",
      activity: "Actividad",
      evaluation: "Evalucación",
    },
    progress: [],
  }),
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    getCourse() {
      this.loading = true;
      this.$http
        .get(`/course/one?id=${this.$route.params.id}`)
        .then((response) => {
          this.course = response.data;

          this.progress = [];

          this.course.lessons.map(async (lesson, index) => {
            try {
              let response = await this.$http.get("/progress/one", {
                params: {
                  student: this.user.student_id,
                  course: this.$route.params.id,
                  lesson: lesson._id,
                },
              });

              this.progress.push(response.data);
            } catch (error) {
              let progress = await this.$http.post("/progress/create", {
                student: this.user.student_id,
                course: this.$route.params.id,
                lesson: lesson._id,
                isActive: lesson.order == 1 ? false : true,
              });

              this.progress.push(progress.data);
            }
          });

          this.course.lessons = this.course.lessons.sort(
            (a, b) => (a.order > b.order && 1) || -1
          );

          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    goLesson(id) {
      this.$router.push(`/course/${this.course._id}/lesson/${id}`);
    },
  },
};
</script>
