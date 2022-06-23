<template>
  <v-main class="main-course">
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
    <template v-esle>
      <v-container>
        <v-row>
          
          <v-col cols="6" align-self="center">
            <h1 class="pa-2 subtitle">
              Curso: {{ course ? course.name : "" }}
            </h1>
          </v-col>

          <v-col cols="6">
            <v-sheet class="main-border">
              <h1 class="pa-2 subtitle">Acerca del curso</h1>
              <p class="pa-2 subtitle-2 text-justify">
                El Sistema cognitivo te ofrecerá una secuencia de aprendizaje
                personalizada de acuerdo a tus estilos de aprendizaje detectados
                en el test anterior. Mediante esta herramienta accederás a los
                contenidos del curso Protocolos de atención para la detección
                temprana de sífilis gestacional y congénita, el cual se divide
                en cuatro unidades que podrás ver a continuación. El tiempo de
                dedicación al curso será de 24 horas mínimo.
              </p>

              <p class="pa-2 subtitle-2 text-justify">
                Esperamos que disfrutes de esta experiencia de aprendizaje y que
                una vez terminada puedas poner en práctica los conocimientos
                adquiridos.
              </p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid class="white mb-9">
        <v-row class="mr-10 ml-10">
          <v-col md="8" sm="12">
            <v-sheet>
              <v-layout row wrap>
                <v-flex
                  xs="6"
                  v-for="(lesson, index) in course ? course.lessons : []"
                  :key="index"
                >
                  <v-card
                    link
                    :disabled="
                      progress[index] &&
                      progress.filter((x) => x.lesson == lesson._id)[0] &&
                      progress.filter((x) => x.lesson == lesson._id)[0].isActive
                    "
                    class="mx-auto my-12"
                    height="220"
                    max-width="374"
                    @click.stop="goLesson(lesson._id)"
                  >
                    <v-img
                      height="100"
                      :src="require(`@/assets/images/Unidad${index + 1}.png`)"
                    >
                      <v-chip
                        v-if="
                          progress[index] &&
                          progress.filter((x) => x.lesson == lesson._id)[0] &&
                          progress.filter((x) => x.lesson == lesson._id)[0]
                            .complete
                        "
                        color="green"
                        class="ma-2"
                      >
                        Completado
                      </v-chip>
                      <v-chip v-else color="orange" class="ma-2">
                        Pendiente
                      </v-chip>
                    </v-img>

                    <v-card-title>{{ lesson.title }}</v-card-title>

                   
                  </v-card>
                </v-flex>
              </v-layout>
            </v-sheet>
          </v-col>

          <v-col md="4" sm="12">
            <v-sheet class="border">
              <v-list rounded>
                <v-list-item class="tile">
                  <v-list-item-content>
                    <v-list-item-title class="white--text">
                      Información general
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title>
                      <a
                        href="https://drive.google.com/file/d/1AH6z8iTLcPaR7Az5WFtQNvC1ADTrPs5V/view"
                        target="_blank"
                        >Programa del curso</a
                      >
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title>
                      <a
                        href="https://drive.google.com/file/d/1CDaEfpfI3qyi14s-8k1AUnLhwE4hLw1W/view"
                        target="_blank"
                        >Metodología
                      </a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title>
                      <a
                        href="https://drive.google.com/file/d/1xlQVt6ThDlHZiGsNE6fAYoh_mgwP29FP/view"
                        target="_blank"
                        >Evaluación
                      </a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title>
                      <a
                        href="https://drive.google.com/file/d/1ZW9T7WpjVVZLWU4vq0LFybeMez5rrREt/view"
                        target="_blank"
                        >Créditos
                      </a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-main>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Course",
  data: () => ({
    rating: 0,
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
  created() {
    this.getCourse();
  },
  methods: {
    ...mapMutations("lesson", ["setIdCase", "setResources"]),
    ...mapMutations("course", ["setLessons"]),
    async getCourse() {
      this.loading = true;

      try {
        var responseCourse = await this.$http.get(
          `/course/one?id=${this.$route.params.id}`
        );

        this.course = responseCourse.data;

        this.progress = [];

        Promise.all(
          this.course.lessons.map(async (lesson, index) => {
            try {
              let responseProgress = await this.$http.get("/progress/one", {
                params: {
                  student: this.user.student_id,
                  course: this.$route.params.id,
                  lesson: lesson._id,
                },
              });

              this.progress.push(responseProgress.data);
            } catch (error) {
              let progress = await this.$http.post("/progress/create", {
                student: this.user.student_id,
                course: this.$route.params.id,
                lesson: lesson._id,
                isActive: lesson.order == 1 ? false : true,
              });

              this.progress.push(progress.data);
            }
          })
        ).then((_) => {
          this.course.lessons = this.course.lessons.sort(
            (a, b) => (a.order > b.order && 1) || -1
          );

          this.progress.map((p) => {
            this.course.lessons.map((l, index) => {
              if (l._id == p.lesson) {
                this.course.lessons[index].isActive = p.isActive;
              }
            });
          });

          this.setLessons(this.course.lessons);
        });
      } catch (e) {
        this.course = null;
      }

      this.loading = false;
    },
    async goLesson(id) {
      var response = await this.$http.get("/cycle/all", {
        params: {
          stimulus: "click_structure",
          id: this.user.student_id,
          name: this.user.name,
          lesson: id,
        },
      });

      this.setResources(response.data[0]);

      this.$router.push(`/course/${this.course._id}/lesson/${id}`);
    },
    openPdf() {
      window.open("/src/assets/logo.png", "_blank");
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
