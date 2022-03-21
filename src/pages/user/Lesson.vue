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

              <v-breadcrumbs :items="getLessons">
                <template v-slot:item="{ item }">
                  <v-breadcrumbs-item
                    :class="item._id == $route.params.lesson ? 'red--text' : ''"
                    :disabled="item.isActive"
                  >
                    {{ item.title.split(".")[0] }}
                  </v-breadcrumbs-item>
                </template>
              </v-breadcrumbs>
            </v-toolbar>
          </v-col>

          <v-col cols="4">
            <div class="mb-1">
              <v-toolbar flat rounded prominent>
                <v-layout column wrap align-content-space-around align-start>
                  <v-flex shrink>
                    <v-btn
                      color="purple"
                      dark
                      elevation="0"
                      class="mb-4 mt-4"
                      @click="$router.go(-1)"
                    >
                      volver al area personal
                      <v-icon small>mdi-arrow-left</v-icon>
                    </v-btn>
                  </v-flex>

                  <v-flex> Tiempo: {{ time }} Segundos </v-flex>
                </v-layout>
              </v-toolbar>
            </div>
          </v-col>

          <v-col cols="8">
            <v-toolbar flat rounded prominent>
              <v-spacer></v-spacer>

              <v-toolbar-title>
                <p class="subtitle-1 text-wrap">
                  <strong>Resultados de Aprendizaje:</strong>
                  {{ lesson.hasObjectiveLesson }}
                </p>
              </v-toolbar-title>
            </v-toolbar>
          </v-col>

          <v-col cols="4">
            <v-sheet rounded="lg">
              <v-list rounded color="transparent">
                <v-list-item-group color="primary" v-model="inputIndex">
                  <v-list-item
                    v-for="(structure, indice) in lesson
                      ? lesson.structure
                      : []"
                    :key="structure.id"
                    :disabled="
                      progress[indice] &&
                      progress.filter((x) => x.structure == structure._id)[0]
                        .isBlock
                    "
                  >
                    <v-list-item-content>
                      <v-list-item-icon
                        v-if="
                          progress[indice] &&
                          progress.filter(
                            (x) => x.structure == structure._id
                          )[0].isBlock
                        "
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
                </v-list-item-group>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="8">
            <v-sheet min-height="60vh" rounded="lg">
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
                :height="
                  progress[inputIndex] && progress[inputIndex].index === 5
                    ? '65vh'
                    : '40vh'
                "
                class="d-flex flex-column scroll"
                v-else
              >
                <v-card-title>
                  {{ 
                     lesson.structure[inputIndex] && lesson.structure[inputIndex].data ? 
                          lesson.structure[inputIndex].data.resource.description : ""
                  }}
                </v-card-title>
                <v-card-text class="justify-center">
                  <div class="text-center">
                    <template
                      v-if="
                        lesson.structure[inputIndex] &&
                        lesson.structure[inputIndex].type == 'evaluation' &&
                        assessment
                      "
                    >
                      <template v-if="inputConfirm">
                        <v-layout
                          align-content-space-between
                          align-center
                          column
                        >
                          <v-flex>
                            A continuación realizarás la evalucación, ¿estas
                            seguro de iniciarla? A partir de que confirmes no
                            podrás ver el contenido de la lección.
                          </v-flex>
                          <v-flex>
                            <v-btn block color="secondary" @click="test">
                              Confirmar
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </template>
                      <template v-else>
                        <v-form
                          ref="forminterview"
                          class="mx-2"
                          lazy-validation
                        >
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
                    </template>
                    <template v-else>
                      <video-embed
                        v-if="
                          lesson.structure[inputIndex] &&
                          lesson.structure[inputIndex].data &&
                          lesson.structure[inputIndex].data.resource.format ==
                            'video'
                        "
                        :params="{ autoplay: 1 }"
                        :src="lesson.structure[inputIndex].data.resource.url"
                      ></video-embed>
                      <div
                        v-else-if="
                          lesson.structure[inputIndex] &&
                          lesson.structure[inputIndex].data &&
                          lesson.structure[inputIndex].data.resource.format ==
                            'embed'
                        "
                        v-html="lesson.structure[inputIndex].data.resource.url"
                      ></div>
                      <div v-else>
                        {{ inputIndex }}
                        y el recurso?
                      </div>
                    </template>
                  </div>
                </v-card-text>
              </v-card>

              <v-layout
                class="mr-5 ml-5 mt-12"
                row
                wrap
                align-center
                align-content-space-between
                v-if="progress[inputIndex] || inputConfirm"
              >
                <v-btn
                  class="ml-4"
                  color="purple"
                  dark
                  elevation="0"
                  @click="back"
                  v-if="progress[inputIndex] && progress[inputIndex].index != 5"
                >
                  <v-icon>mdi-arrow-left</v-icon>
                  Anterior
                </v-btn>
                <!-- <v-spacer></v-spacer> -->

                <v-layout column wrap align-center>
                  <v-flex
                    shrink
                    class="mr-5"
                    align-items-center
                    v-if="
                      lesson.structure[inputIndex] &&
                      lesson.structure[inputIndex].data
                    "
                  >
                    <h4 class="display-5">
                      ¿Qué tal útil te parecio este recurso? 😊
                    </h4>
                  </v-flex>

                  <v-flex
                    shrink
                    v-if="lesson.structure[inputIndex].data"
                    class="mb-4"
                  >
                    <v-rating
                      v-model="rating"
                      background-color="orange lighten-3"
                      color="orange"
                      large
                    >
                    </v-rating>
                  </v-flex>
                </v-layout>

                <v-btn
                  class="mr-4"
                  color="purple"
                  dark
                  elevation="0"
                  @click="finish"
                  v-if="
                    progress[inputIndex] && progress[inputIndex].index === 5 && !inputConfirm
                  "
                >
                  Finalizar
                  <v-icon>mdi-check</v-icon>
                </v-btn>

                <v-btn
                  class="mr-4"
                  color="purple"
                  dark
                  elevation="0"
                  @click="skip"
                  v-else
                >
                  Siguiente
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-layout>
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
    isValid: false,
    progress: [],
    assessments: [],
    assessment: null,
    logs: [],
    note: 0,
    isLoading: false,
    showFeedback: false,
    time: 0,
    totalTime: 0,
    isRunning: false,
    isRunningTotal: false,
    interval: null,
    intervalTotal: null,
  }),
  created() {
    this.getLesson();
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters("lesson", [
      "getCurrentFeedback",
      "getTrace",
      "getIdCase",
      "getIndex",
      "getConfirm",
    ]),
    ...mapGetters("course", ["getLessons"]),
    inputFeedback: {
      get() {
        return this.getCurrentFeedback;
      },
      set(val) {
        this.nextFeedback(val);
      },
    },
    inputIndex: {
      get() {
        return this.getIndex;
      },
      set(val) {
        this.setIndex(val);
      },
    },
    inputConfirm: {
      get() {
        return this.getConfirm;
      },
      set(val) {
        this.setConfirm(val);
      },
    },
  },
  watch: {
    inputIndex(oldValue, newValue) {
      console.log(newValue);
      if (newValue == 5) {
        this.setConfirm(true);
      }
    },
  },
  methods: {
    ...mapMutations("lesson", [
      "nextFeedback",
      "setTrace",
      "setIdCase",
      "setIndex",
      "setConfirm",
    ]),
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

      this.setIdCase(null);

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
          await this.skipProgress();
          await this.getResources();
          await this.getAssessment();
        });
      } catch (e) {
        console.log(e.message);
      }

      this.loading = false;
    },
    async getResources() {
      if (this.getIdCase == null) {
        let structureIds = this.lesson.structure.map((s) => s._id);

        let response = await this.$http.post("/metacore/initial", {
          id_student: this.user.student_id,
          id_course: this.$route.params.course,
          id_lesson: this.$route.params.lesson,
          structure: structureIds,
        });

        this.setIdCase(response.data.id_case);

        this.lesson.structure = this.lesson.structure.map((s, index) => {
          s.data = response.data.plan[index];
          return s;
        });
      } else {
        let response = await this.$http.get("/metacore/one", {
          id: this.getIdCase,
        });

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
    async skipProgress() {
      let response = await this.$http.get("/history/all", {
        params: {
          student: this.user.student_id,
          course: this.$route.params.course,
          lesson: this.$route.params.lesson,
        },
      });

      this.progress = response.data.sort((a, b) => a.index - b.index);

      let progress = this.progress.filter((p) => p.isBlock === false);
      this.inputIndex = progress[progress.length - 1].index;
    },
    async back() {
      if (this.inputIndex != 0) {
        if (this.inputIndex == 5) {
          this.setConfirm(true);
        }

        try {
          this.lesson.structure[this.inputIndex].data.time_use += this.time;
          this.lesson.structure[this.inputIndex].data.rating = this.rating;
        } catch (e) {
          console.log(e);
        }
      }
    },
    async skip() {
      if (this.inputIndex < this.lesson.structure.length && this.rating != 0) {
        if (this.inputIndex == 5) {
          this.setConfirm(true);
        }

        try {
          if (this.lesson.structure[this.inputIndex].data) {
            this.lesson.structure[this.inputIndex].data.time_use += this.time;
            this.lesson.structure[this.inputIndex].data.rating = this.rating;

            this.assessments.push({
              time_use: this.lesson.structure[this.inputIndex].data.time_use,
              like: this.lesson.structure[this.inputIndex].data.rating,
            });
          }

          let resourcesIds = this.lesson.structure.filter((s) => {
            if (s.data) {
              return s.data.resource._id;
            }
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

          let history = await this.$http.post("/history/update", {
            id: this.progress.filter((p) => p.isBlock === true)[0]._id,
            isBlock: false,
          });

          if (history && history.data) {
            this.rating = 0;
            this.toggleTimer();
            await this.skipProgress();
            this.toggleTimer();
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        let args = {
          color: "error",
          message: "Error!",
          submessage: "Debes calificar el recurso",
          pos: ["top", "center"],
        };

        this.loading = false;
        this.open(args);
      }
    },
    async finish() {
      let valid = this.$refs.forminterview.validate();

      if (valid) {
        let resourcesIds = this.lesson.structure.filter((s) => {
          if (s.data) {
            return s.data;
          }
        });

        let sum = 0;

        this.assessment.questions.map((as) => {
          if (as.response == as.user) {
            let note = 5 / this.assessment.questions.length;
            sum = sum + note;
          }
        });

        this.note = sum;

        this.assessments.forEach((as) => {
          if (as.time_use > 60 && as.like > 3) {
            this.isValid = true;
          } else {
            this.isValid = false;
          }
        });

        Promise.all([
          this.$http.post("/metacore/history", {
            id_case: this.getIdCase,
            id_student: this.user.student_id,
            was: this.note == 5 ? "success" : "error",
            note: this.note,
          }),
          this.$http.post("/metacore/update", {
            id_case: this.getIdCase,
            resources: resourcesIds,
          }),
        ]).then((response) => {
          console.log(response);
        });

        if (this.note == 5 && this.isValid) {
          this.$http
            .post("/metacore/review", {
              id_case: this.getIdCase,
              success: true,
              errors: false,
              time: this.totalTime,
            })
            .then(async (response) => {
              if (response.status == 200) {
                this.toogleTotalTime();
                this.setIdCase(null);

                let currentLesson = this.getLessons.filter(
                  (gl) => gl._id == this.$route.params.lesson
                );

                if (currentLesson.length > 0) {
                  currentLesson = currentLesson[0];

                  let response = await this.$http.post("/progress/update", {
                    id: currentLesson._id,
                    isActive: true,
                  });

                  if (response.status == 200) {
                    //paso a activar la siguiente leccion

                    if (
                      this.getLessons.indexOf(currentLesson) <
                      this.getLessons.length - 1
                    ) {
                      let result = await this.$http.post("/progress/update", {
                        id: currentLesson._id,
                        isActive: false,
                      });

                      if (result.status == 200) {
                        this.$router.push(
                          `/course/${this.$route.params.course}`
                        );
                      }
                    }
                  }
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (this.note == 5) {

          this.$http
            .post("/metacore/review", {
              id_case: this.getIdCase,
              success: false,
              errors: true,
              time: this.totalTime,
            })
            .then(async (response) => {
              if (response.status == 200) {
                this.toogleTotalTime();
                this.setIdCase(null);

                let currentLesson = this.getLessons.filter(
                  (gl) => gl._id == this.$route.params.lesson
                );

                if (currentLesson.length > 0) {
                  currentLesson = currentLesson[0];

                  let response = await this.$http.post("/progress/update", {
                    id: currentLesson._id,
                    isActive: true,
                  });

                  if (response.status == 200) {
                    //paso a activar la siguiente leccion

                    if (
                      this.getLessons.indexOf(currentLesson) <
                      this.getLessons.length - 1
                    ) {
                      let result = await this.$http.post("/progress/update", {
                        id: currentLesson._id,
                        isActive: false,
                      });

                      if (result.status == 200) {
                        this.$router.push(`/course/${this.$route.params.course}`);
                      }
                    }
                  }
                }
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
      this.setConfirm(true);
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
          id_case: this.getIdCase,
          resources: resourcesIds,
        }),
        this.$http.post("/metacore/review", {
          id_case: this.getIdCase,
          success: false,
          error: true,
          time: this.totalTime,
        }),
      ]).then(async (result) => {
        if (result && result.filter((r) => r.status == 200)) {
          this.setIdCase(null);

          await this.$http.post("/history/update", {
            id: this.progress.filter((f) => f.index == 0)._id,
            isBlock: false,
          });

          await Promise.all(
            this.progress.map(async (p, index) => {
              if (p.index != 0) {
                return await this.$http.post("/history/update", {
                  id: p._id,
                  isBlock: true,
                });
              } else {
                return await this.$http.post("/history/update", {
                  id: p._id,
                  isBlock: false,
                });
              }
            })
          ).then((response) => {
            this.skipProgress();
            this.setConfirm(true);
          });

          this.$router.push(`/course/${this.$route.params.course}`);
        }
      });
    },
    async test() {
      await Promise.all(
        this.progress.map(async (p, index) => {
          if (p.index != 5) {
            return await this.$http.post("/history/update", {
              id: p._id,
              isBlock: true,
            });
          } else {
            return await this.$http.post("/history/update", {
              id: p._id,
              isBlock: false,
            });
          }
        })
      ).then((response) => {
        this.skipProgress();
        this.setConfirm(false);
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
