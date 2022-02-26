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
        <v-row v-if="lesson">
          <v-col cols="12">
            <v-toolbar flat rounded>
              <v-toolbar-title>
                <p class="font-weight-semibold mb-1">
                  {{ lesson ? lesson.title : "" }}
                </p>
                <v-progress-linear
                  color="red lighten-2"
                  buffer-value="20"
                  stream
                ></v-progress-linear>
              </v-toolbar-title>

              <v-divider class="mx-2" inset vertical></v-divider>

              <div class="flex-grow-1"></div>

              <v-btn
                color="purple"
                dark
                elevation="0"
                class="mb-2 mr-2"
                @click="$router.go(-1)"
              >
                volver al area personal
                <v-icon small>mdi-arrow-left</v-icon>
              </v-btn>
            </v-toolbar>
          </v-col>

          <v-col cols="4">
            <v-sheet rounded="lg">
              <v-list rounded color="transparent">
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="(structure, indice) in lesson
                      ? lesson.structure
                      : []"
                    :key="structure.id"
                    :disabled="progress[indice] && progress[indice].isBlock"
                  >
                    <v-list-item-content>
                      <v-list-item-icon
                        v-if="progress[indice] && progress[indice].isBlock"
                      >
                        <v-icon>mdi-disable</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>
                        {{ types[structure.type] }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ structure.title }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-btn
                        color="purple"
                        dark
                        elevation="0"
                        @click="finish"
                        v-if="progress[index] && progress[index].index === 5"
                      >
                        Finalizar
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <v-btn
                        color="purple"
                        dark
                        elevation="0"
                        @click="skip"
                        v-else
                      >
                        Siguiente
                        <v-icon>mdi-arrow-right</v-icon>
                      </v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="69vh" rounded="lg">
              <v-container
                fluid
                fill-height
                class="grey lighten-4"
                v-if="showFeedback"
              >
                <v-layout justify-center align-center>
                  <v-flex>
                    {{ this.assessment.feedbacks[inputFeedback].name }}
                  </v-flex>
                  <v-flex>
                    <v-btn block color="primary" @click="rebuild"
                      >Intentarlo de nuevo</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card
                elevation="0"
                height="69vh"
                class="d-flex flex-column scroll"
                v-else
              >
                <v-card-title>
                  <template
                    v-if="
                      lesson.structure[index] &&
                      lesson.structure[index].type == 'evaluation' &&
                      assessment
                    "
                  >
                    {{ assessment.title }}
                  </template>
                  <template v-else>
                    {{
                      lesson.structure[index].data &&
                      lesson.structure[index].data.resource.description
                        ? lesson.structure[index].data.resource.description
                        : ""
                    }}
                    - {{ time }}
                  </template>
                </v-card-title>

                <v-card-text class="justify-center">
                  <div class="text-center">
                    <template
                      v-if="
                        lesson.structure[index] &&
                        lesson.structure[index].type == 'evaluation' &&
                        assessment
                      "
                    >
                      <v-form ref="forminterview" class="mx-2" lazy-validation>
                        <template
                          v-for="(question, key) in assessment.questions"
                        >
                          <v-select
                            :key="key"
                            outlined
                            :label="question.name"
                            v-model="question.user"
                            :items="question.options"
                            item-text="label"
                            :rules="[
                              (v) => !!v || 'Debes completar esta pregunta',
                            ]"
                            required
                          />
                        </template>
                      </v-form>
                    </template>
                    <template v-else>
                      <video-embed
                        :params="{ autoplay: 1 }"
                        :src="
                          lesson.structure[index].data &&
                          lesson.structure[index].data.resource.url
                        "
                      ></video-embed>
                    </template>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-layout column wrap align-center>
                    <v-flex
                      shrink
                      class="mr-5"
                      align-items-center
                      v-if="lesson.structure[index].data"
                    >
                      <h4 class="display-5">
                        ¿Qué tal útil te parecio este recurso? 😊
                      </h4>
                    </v-flex>

                    <v-flex shrink v-if="lesson.structure[index].data">
                      <v-rating
                        v-model="rating"
                        background-color="orange lighten-3"
                        color="orange"
                        large
                      >
                      </v-rating>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </v-main>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "Lesson",
  data: () => ({
    index: 0,
    rating: 0,
    loading: false,
    lesson: null,
    types: {
      introduction: "Introducción",
      definition: "Definición",
      description: "Descripción",
      example: "Ejemplo",
      activity: "Actividad",
      evaluation: "Evalucación",
    },
    progress: [],
    assessments: [],
    assessment: null,
    logs: [],
    note: 0,
    isLoading: false,
    showFeedback: false,
    id_case: null,
    time: 0,
    totalTime: 0,
    isRunning: false,
    isRunningTotal: false,
    interval: null,
    intervalTotal: null,
  }),
  mounted() {
    this.getLesson();
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters("lesson", ["getCurrentFeedback", "getTrace"]),
    inputFeedback: {
      get() {
        return this.getCurrentFeedback;
      },
      set(val) {
        this.nextFeedback(val);
      },
    },
  },
  methods: {
    ...mapMutations("lesson", ["nextFeedback", "setTrace"]),
    ...mapMutations("notification", ["open"]),
    toogleTotalTime() {
      if (this.isRunningTotal) {
        this.totalTime = 0;
        clearInterval(this.intervalTotal);
      } else {
        this.intervalToal = setInterval(this.incrementTotalTime, 1000);
      }
      this.isRunningTotal = !this.isRunningTotal;
    },
    toggleTimer() {
      if (this.isRunning) {
        this.time = 0;
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.incrementTime, 1000);
      }
      this.isRunning = !this.isRunning;
    },
    incrementTime() {
      this.time = parseInt(this.time) + 1;
    },
    incrementTotalTime() {
      this.totalTime = parseInt(this.totalTime) + 1;
    },
    openSettings() {
      this.$refs.stopwatch.openSettingsDialog();
    },
    openHelp() {
      this.$refs.stopwatch.openHelpDialog();
    },
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
    async getLesson() {
      this.loading = true;

      try {
        let response = await this.$http.get(
          `/lesson/one?id=${this.$route.params.lesson}`
        );

        this.lesson = response.data;

        Promise.all(
          this.lesson.structure.map(async (structure, index) => {
            try {
              let responseProgress = await this.$http.get("/history/one", {
                params: {
                  student: this.user.student_id,
                  course: this.$route.params.course,
                  lesson: this.$route.params.lesson,
                  structure: structure._id,
                },
              });

              this.progress.push(responseProgress.data);
            } catch (error) {
              let progress = await this.$http.post("/history/create", {
                student: this.user.student_id,
                course: this.$route.params.course,
                lesson: this.$route.params.lesson,
                structure: structure._id,
                isBlock: index == 0 ? false : true,
                index: index,
              });

              this.progress.push(progress.data);
            }
          })
        ).then(async (_) => {
          await this.getResources();
          await this.getAssessment();
        });
      } catch (e) {
        console.log(e.message);
      }

      this.loading = false;
    },
    async getResources() {
      if (this.id_case == null) {

        
        let structureIds = this.lesson.structure.map((s) => s._id);

        let response = await this.$http.post("/metacore/initial", {
          id_student: this.user.student_id,
          id_course: this.$route.params.course,
          id_lesson: this.$route.params.lesson,
          structure: structureIds,
        });

        this.id_case = response.data.id_case;

        this.lesson.structure = this.lesson.structure.map((s, index) => {
          s.data = response.data.plan[index];
          return s;
        });
      }

      this.toggleTimer();
      this.toogleTotalTime();
    },
    async getAssessment() {
      try {
        let response = await this.$http.get(
          `/assessment/one?lesson=${this.$route.params.lesson}`
        );

        this.assessment = response.data;
        this.assessment.questions = this.shuffle(this.assessment.questions);
      } catch (e) {
        console.log(e);
      }
    },
    async skip() {
      if (this.index < this.lesson.structure.length) {
        this.index = this.progress.filter((p) => p.isBlock === false)[0].index;

        try {
          this.lesson.structure[this.index].data.time_use = this.time;
          this.lesson.structure[this.index].data.rating = this.rating;

          let resourcesIds = this.lesson.structure.map((s) => {
            if (s.data) {
              return s.data.resource._id;
            }
          });

          this.assessments.push({
            time_use: this.lesson.structure[this.index].data.time_use,
            like: this.lesson.structure[this.index].data.rating,
          });

          if (this.assessments.length == 1) {
            let response = await this.$http.post("/trace/create", {
              student: this.user.student_id,
              course: this.$route.params.course,
              lesson: this.$route.params.lesson,
              resources: resourcesIds,
              assessments: this.assessments,
              logs: this.logs,
            });

            if (response.status == 200) {
              this.setTrace(response.data._id);
            }
          } else {
            await this.$http.post("/trace/update", {
              id: this.getTrace,
              resources: resourcesIds,
              assessments: this.assessments,
              logs: this.logs,
            });
          }

          let response = await this.$http.post("/history/update", {
            id: this.progress[this.index]._id,
            isBlock: true,
          });

          if (response && response.data) {
            this.progress[this.index].isBlock = true;

            let history = await this.$http.post("/history/update", {
              id: this.progress[this.index + 1]._id,
              isBlock: false,
            });

            if (history && history.data) {
              this.rating = 0;
              this.toggleTimer();
              this.progress[this.index + 1].isBlock = false;
              this.toggleTimer();
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    async finish() {
      let valid = this.$refs.forminterview.validate();

      if (valid) {
        let resourcesIds = this.lesson.structure.map((s) => {
          if (s.data) {
            return s.data;
          }
        });

        this.assessments = [];

        let sum = 0;

        this.assessment.questions.map((as) => {
          if (as.response == as.user) {
            let note = 5 / this.assessment.questions.length;
            sum = sum + note;
          }
        });

        this.note = sum;

        Promise.all([
          this.$http.post("/metacore/history", {
            id_case: this.id_case,
            id_student: this.user.student_id,
            was: this.note == 5 ? "success" : "error",
            note: this.note,
          }),
          this.$http.post("/metacore/update", {
            id_case: this.id_case,
            resources: resourcesIds,
          }),
        ]).then((response) => {
          console.log(response);
        });

        if (this.note == 5) {
          this.$http
            .post("/metacore/review", {
              id_case: this.id_case,
              success: true,
              errors: false,
              time: this.totalTime,
            })
            .then((response) => {
              if (response.status == 200) {
                this.toogleTotalTime();
                this.$http
                  .post("/progress/create", {
                    id_student: this.user.student_id,
                    id_course: this.$route.params.course,
                    id_lesson: this.$route.params.lesson,
                  })
                  .then((response) => {
                    if (response.status == 200) {
                      this.$router.push(`/course/${this.$route.params.course}`);
                    }
                  })
                  .catch((error) => {
                    console.error(error.message);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          if (this.inputFeedback < 4) {
            this.nextFeedback(this.inputFeedback + 1);
          } else {
            this.nextFeedback(0);
          }

          this.showFeedback = true;
          this.assessments = [];
        }
      } else {
        let args = {
          color: "error",
          message: "Error!",
          submessage: "Debes completar todas las preguntas",
          pos: ["top", "center"],
        };

        this.loading = false;
        this.open(args);
      }
    },
    async rebuild() {
      this.showFeedback = false;

      let resourcesIds = this.lesson.structure.map((s) => {
        if (s.data) {
          return {
            resource: s.data.resource._id,
            time_use: s.data.time_use,
            rating: s.data.rating,
          };
        }
      });

      Promise.all([
        this.$http.post("/metacore/update", {
          id_case: this.id_case,
          resources: resourcesIds,
        }),
        this.$http.post("/metacore/review", {
          id_case: this.id_case,
          success: false,
          error: true,
          time: this.totalTime,
        }),
      ]).then(async (result) => {
        console.log(result);
        if (result && result.filter((r) => r.status == 200)) {
          this.id_case = null;

          await this.$http.post("/history/update", {
            id: this.progress[this.index]._id,
            isBlock: true,
          });

          this.index = 0;

          await this.$http.post("/history/update", {
            id: this.progress[this.index]._id,
            isBlock: false,
          });

          await this.getLesson();
        }
      });
    },
  },
};
</script>
<style scoped>
.flexcard {
  display: flex;
  flex-direction: column;
}

.scroll {
  overflow-y: scroll;
}
</style>
