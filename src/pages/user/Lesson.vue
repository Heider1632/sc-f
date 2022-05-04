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
      <v-container fluid class="main-course">
        <v-row v-if="lesson" class="ml-16 mt-2 mb-2 mr-16">
          <v-col lg="5" md="5" sm="5" cols="12">
            <v-sheet>
              <p class="subtitle pa-4">
                <strong>Resultados de aprendizaje:</strong>
                {{ lesson.hasObjectiveLesson }}
              </p>
            </v-sheet>
          </v-col>

          <v-col lg="3" md="3" sm="3" cols="12">
            <v-sheet>
              <h3 class="pa-2">Progreso del curso</h3>
              <v-progress-linear color="green" :value="percentageCourse" height="20">
                <template v-slot:default="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>

              <h3 class="pa-2">Progreso de la lección</h3>
              <v-progress-linear color="orange" :value="progress" height="20">
                <template v-slot:default="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
            </v-sheet>
          </v-col>
          <v-col lg="4" md="4" sm="4" cols="12">
            <v-sheet class="border white pa-2">
              <v-layout fill-height column>
                <v-flex>
                  <h3>Componentes de conocimientos</h3>
                </v-flex>
                <v-flex v-for="kc in lesson.knowledgeComponent" :key="kc._id">
                  <p class="text-wrap text-justify caption">
                    {{ kc.name }}
                  </p>
                </v-flex>
              </v-layout>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-col lg="3" md="3" sm="3" cols="12">
            <v-sheet rounded="lg">
              <v-list rounded color="transparent">
                <v-list-item-group color="primary" v-model="inputIndex">
                  <v-list-item
                    v-for="(structure, indice) in lesson
                      ? lesson.structure
                      : []"
                    :key="structure.id"
                    :disabled="
                      getProgress[indice] &&
                      getProgress.filter(
                        (x) => x.structure == structure._id
                      )[0] &&
                      getProgress.filter((x) => x.structure == structure._id)[0]
                        .isBlock
                    "
                  >
                    <v-list-item-content>
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

          <v-col lg="6" md="6" sm="6" cols="12">
            <v-sheet min-height="60vh" rounded="lg">
              <v-container
                fluid
                fill-height
                class="grey lighten-4"
                v-if="getShowWin"
              >
                <v-card elevation="0">
                  <v-card-text>
                    <v-layout column justify-center align-center>
                      <v-flex>
                        <v-alert type="success">
                          Has alcanzado el 100% de la lección. Te invitamos a
                          continuar desarrollando las siguientes unidades del
                          curso.
                        </v-alert>
                      </v-flex>
                      <hr />
                      <v-flex>
                        <v-btn text color="purple" @click="goToCourse">
                          Finalizar
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-container>

              <v-container
                fluid
                fill-height
                class="grey lighten-4"
                v-else-if="showFeedback"
              >
                <v-card elevation="0">
                  <v-card-text>
                    <v-layout column justify-center align-center>
                      <v-flex>
                        <v-alert type="error">
                          Obtuviste el {{ percentage }}% en la calificación. Te
                          invitamos a repetir la unidad para mejorar este
                          porcentaje ¡Ánimo!
                        </v-alert>
                        <p class="subtitle mb-2">
                          Retroalimentacion general: {{ assessment.feedback }}
                        </p>
                      </v-flex>
                      <hr />
                      <v-flex
                        v-for="(feedback, key) in feedbacks"
                        :key="`feedback-${key}`"
                      >
                        <p class="subtitle mb-2">
                          Retroalimentacion {{ key + 1 }}: {{ feedback.name }}
                        </p>
                      </v-flex>
                      <v-flex>
                        <v-btn block color="primary" @click="rebuild"
                          >Intentarlo de nuevo</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-container>

              <v-card
                elevation="0"
                :height="
                  getProgress[inputIndex] && getProgress[inputIndex].index === 5
                    ? '65vh'
                    : !getConfirm
                    ? '50vh'
                    : '70vh'
                "
                class="d-flex flex-column scroll"
                v-else
              >
                <v-card-text class="justify-center">
                  <div class="text-center">
                    <template
                      v-if="
                        lesson.structure[inputIndex] &&
                        lesson.structure[inputIndex].type == 'evaluation' &&
                        assessment &&
                        !getShowWin
                      "
                    >
                      <template v-if="inputConfirm">
                        <v-layout
                          align-content-space-between
                          align-center
                          column
                          class="text-center"
                        >
                          <v-flex>
                            A continuación realizarás la evalucación, ¿estas
                            seguro de iniciarla? A partir de que confirmes no
                            podrás ver el contenido de la lección.
                          </v-flex>
                          <v-flex>
                            <v-btn block color="primary" @click="test">
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
                          <template v-for="(question, key) in questions">
                            <p
                              class="subtitle text-justify"
                              :key="`title-${key}`"
                            >
                              {{ question.name }}
                            </p>
                            <v-select
                              :key="`question-${key}`"
                              outlined
                              v-model="question.user"
                              :items="question.options"
                              item-text="label"
                              :rules="[
                                (v) => !!v || 'Debes completar esta pregunta',
                              ]"
                              required
                            >
                              <template v-slot:item="slotProps">
                                {{ slotProps.item.label }}
                              </template>
                            </v-select>
                          </template>
                        </v-form>
                      </template>
                    </template>
                    <template v-else>
                      <video-embed
                        v-if="
                          getResources[inputIndex] &&
                          getResources[inputIndex].resource.format == 'video'
                        "
                        :params="{ autoplay: 1 }"
                        :src="getResources[inputIndex].resource.url"
                      ></video-embed>
                      <div
                        v-else-if="
                          getResources[inputIndex] &&
                          getResources[inputIndex].resource.format == 'embed'
                        "
                        v-html="getResources[inputIndex].resource.url"
                      ></div>
                      <div v-else>
                        {{ inputIndex }}
                        y el recurso?
                      </div>
                    </template>
                  </div>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-col>

          <v-col lg="3" md="3" sm="3" cols="12">
            <v-sheet class="spa-6 d-flex align-content-center">
              <v-btn
                class="mr-4"
                color="purple"
                dark
                elevation="0"
                @click="back"
                v-if="
                  getProgress[inputIndex] &&
                  getProgress[inputIndex].index != 0 &&
                  getProgress[inputIndex].index != 5
                "
              >
                <v-icon>mdi-arrow-left</v-icon>
                Anterior
              </v-btn>

              <v-btn
                class="mr-4"
                color="purple"
                dark
                elevation="0"
                @click="finish"
                v-if="
                  getProgress[inputIndex] &&
                  getProgress[inputIndex].index === 5 &&
                  !inputConfirm &&
                  !showFeedback
                "
              >
                Finalizar
                <v-icon>mdi-check</v-icon>
              </v-btn>

              <v-btn
                class="ml-4"
                color="purple"
                dark
                elevation="0"
                @click="skip"
                v-if="
                  getProgress[inputIndex] &&
                  getProgress[inputIndex].index != 5 &&
                  inputConfirm
                "
              >
                Siguiente
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-sheet>

            <v-sheet class="border mt-10 mb-10">
              <div class="mb-1 pa-6">
                <v-flex> Tiempo: {{ time }} Segundos </v-flex>
                <v-flex> Intento N°: {{ attempts }} </v-flex>
              </div>
            </v-sheet>

            <v-sheet v-if="getResources[inputIndex]">
              <p class="mb-10">¿Consideras que este recurso aporta a tu aprendizaje?</p>
              <v-slider
                v-model="getResources[inputIndex].rating"
                max="5"
                min="0"
                thumb-color="primary"
                thumb-label="always"
              ></v-slider>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-main>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "Lesson",
  data: () => ({
    rating: 0,
    loading: false,
    lesson: null,
    attempts: 0,
    types: {
      introduction: "Introducción",
      definition: "Definición",
      description: "Descripción",
      example: "Ejemplo",
      activity: "Actividad",
      evaluation: "Evaluación",
    },
    isValid: false,
    assessment: null,
    questions: [],
    feedbacks: [],
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
    percentage: 0,
    progress: 0,
    percentageCourse: 0,
  }),
  created() {
    this.getAttempts();
    this.getPercentageStudent();
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
      "getResources",
      "getAssessments",
      "getProgress",
      "getShowFinishButton",
      "getShowBackButton",
      "getShowWin",
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
    inputIndex(val) {

      this.progress = (val / 6 * 100).toFixed(0);
      if (this.getResources && this.getResources[val].data && this.getResources[val].rating != 0) {
        this.rating = this.getResources[val].rating;
      } else {
        this.rating = 0;
      }

      if (val == 5) {
        this.setConfirm(true);
      }
    },
    rating(val) {
      if (val != 0) {
        this.getResources[this.inputIndex].rating = val;
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
      "setAssessments",
      "reorderProgress",
      "pushAssessment",
      "setProgress",
      "pushProgress",
      "updateProgress",
      "setShowFinishButton",
      "setShowBackButton",
      "setWin",
    ]),
    ...mapActions("lesson", [
      "setAsyncProgress",
      "getAsyncProgress",
      "createAsyncProgress",
      "getAsyncTrace",
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
    async getAttempts() {
      try {
        let response = await this.$http.get(
          `/student/attempts?student=${this.user.student_id}&course=${this.$route.params.course}&lesson=${this.$route.params.lesson}`
        );

        this.attempts = response.data.count;
      } catch (error) {
        console.log(error.message);
      }
    },
     async getPercentageStudent() {
      try {
        let response = await this.$http.get(
          `/progress/percentage?student=${this.user.student_id}&course=${this.$route.params.course}&lesson=${this.$route.params.lesson}`
        );

        this.percentageCourse = response.data.count;
      } catch (error) {
        console.log(error.message);
      }
    },
    async getLesson() {
      this.loading = true;

      this.toggleTimer();
      this.setIdCase(null);

      try {
        let response = await this.$http.get(
          `/lesson/one?id=${this.$route.params.lesson}`
        );

        this.lesson = response.data;

        this.setProgress([]);
        this.setAssessments([]);

        Promise.all(
          this.lesson.structure.map(async (structure, index) => {
            this.getAsyncProgress({
              student: this.user.student_id,
              course: this.$route.params.course,
              lesson: this.$route.params.lesson,
              structure: structure._id,
            }).then(
              (response) => {},
              (error) => {
                this.createAsyncProgress({
                  student: this.user.student_id,
                  course: this.$route.params.course,
                  lesson: this.$route.params.lesson,
                  structure: structure._id,
                  isBlock: index == 0 ? false : true,
                  index: index,
                });
              }
            );
          })
        ).then(async (_) => {
          await this.getAsyncTrace({
            student: this.user.student_id,
            course: this.$route.params.course,
            lesson: this.$route.params.lesson,
          }).then(
            (response) => {
              this.inputIndex = 0;
            },
            (error) => {
              console.log(error.message);
            }
          );

          await this.getAssessment();
        });
      } catch (e) {
        console.log(e.message);
      }

      this.loading = false;
    },
    async getAssessment() {
      try {
        let response = await this.$http.get(
          `/assessment/one?lesson=${this.$route.params.lesson}`
        );

        this.assessment = response.data;

        this.questions = this.assessment.questions;
      } catch (e) {
        console.log(e);
      }
    },
    async skipProgress() {
      if (this.inputIndex >= 0 && this.inputIndex <= 5) {
        this.inputIndex = this.inputIndex + 1;
      }
    },
    async back() {
      if (this.inputIndex > 0 && this.inputIndex <= 5) {
        if (this.inputIndex == 5) {
          this.setConfirm(true);
        }

        try {
          this.inputIndex = this.inputIndex - 1;
          console.log(this.inputIndex);
          this.rating = this.lesson.structure[this.inputIndex].data.rating;
        } catch (e) {
          console.log(e);
        }
      }
    },
    async skip() {
      if (this.inputIndex < this.getResources.length) {
        if (this.inputIndex == 5) {
          this.setConfirm(true);
        }

        this.reorderProgress();

        if (this.getResources[this.inputIndex].rating != 0) {
          try {
            if (this.getResources[this.inputIndex]) {
              this.getResources[this.inputIndex].time_use += this.time;

              this.pushAssessment({
                time_use: this.getResources[this.inputIndex].time_use,
                like: this.getResources[this.inputIndex].rating,
              });
            }

            let resourcesIds = this.getResources.map((s) => {
              if (s) {
                return s.resource._id;
              }
            });

            resourcesIds = resourcesIds.filter((rs) => rs != undefined);

            if (this.getAssessments.length == 1) {
              let response = await this.$http.post("/trace/create", {
                student: this.user.student_id,
                course: this.$route.params.course,
                lesson: this.$route.params.lesson,
                resources: resourcesIds,
                assessments: this.getAssessments,
                logs: this.logs,
              });

              if (response.status == 200) {
                this.setTrace(response.data._id);
              }
            } else {
              await this.$http.post("/trace/update", {
                id: this.getTrace,
                resources: resourcesIds,
                assessments: this.getAssessments,
                logs: this.logs,
              });
            }

            //TODO: update in vuex
            this.setAsyncProgress({
              id: this.getProgress[this.inputIndex + 1]._id,
              index: this.inputIndex + 1,
            });

            this.rating = 0;
            this.toggleTimer();
            await this.skipProgress();
            this.toggleTimer();
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
      }
    },
    async finish() {
      let valid = this.$refs.forminterview.validate();

      if (valid) {
        // let r = await this.$http.get("/cycle/all", {
        //   params: {
        //     stimulus: "click_finish_button",
        //     id: this.user.id,
        //     name: this.user.name,
        //     // content:
        //   },
        // });

        let resourcesIds = this.getResources.map((s) => {
          if (s.data) {
            return s.data;
          }
        });

        resourcesIds = resourcesIds.filter((ri) => ri != undefined);

        let sum = 0;

        this.questions.map((as) => {
          if (as.response == as.user) {
            let note = 5 / this.questions.length;
            sum = sum + note;
          } else {
            if (as.feedbacks.length > 0) {
              this.feedbacks.push(as.feedbacks[0]);
            }
          }
        });

        this.note = sum;

        this.percentage = ((this.note * 100) / 5).toFixed(2);

        this.getAssessments.forEach((as) => {
          if (as.time_use > 60 && as.like > 3) {
            this.isValid = true;
          } else {
            this.isValid = false;
          }
        });

        if (this.note == 5 && this.isValid) {
          await Promise.all(
            this.getProgress.map(async (p) => {
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
          );

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

            this.setWin(true);
            this.setAssessments([]);
            this.setProgress([]);

            if (response.status == 200) {
              //paso a activar la siguiente leccion

              if (currentLesson.index < 4) {
                let index = this.getLessons.indexOf(currentLesson);

                await this.$http.post("/progress/update", {
                  id: this.getLessons[index + 1]._id,
                  isActive: false,
                });
              }
            }
          }
        } else if (this.note == 5) {
          await Promise.all(
            this.getProgress.map(async (p) => {
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
          );

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

            this.setWin(true);
            this.setAssessments([]);
            this.setProgress([]);

            if (response.status == 200) {
              //paso a activar la siguiente leccion

              if (currentLesson.index < 4) {
                let index = this.getLessons.indexOf(currentLesson);

                await this.$http.post("/progress/update", {
                  id: this.getLessons[index + 1]._id,
                  isActive: false,
                });
              }
            }
          }
        } else {
          this.toogleTotalTime();
          this.setIdCase(null);
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

      // let r = await this.$http.get("/cycle/all", {
      //   params: {
      //     stimulus: "click_finish_button",
      //     id: this.user.id,
      //     name: this.user.name,
      //   },
      // });

      await Promise.all(
        this.getProgress.map(async (p, index) => {
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
      ).then((_) => {
        this.setConfirm(true);
        this.setAssessments([]);
        this.setProgress([]);
        this.feedbacks = [];
        this.$router.push(`/course/${this.$route.params.course}`);
      });
    },
    async test() {
      await Promise.all(
        this.getProgress.map(async (p, index) => {
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
        this.reorderProgress();
        response.map((r) => {
          if (r.data.index == 5) {
            this.updateProgress({ index: r.data.index, isBlock: false });
          } else {
            this.updateProgress({ index: r.data.index, isBlock: true });
          }
        });

        this.setConfirm(false);
      });
    },
    goToCourse() {
      this.setWin(false);
      this.$router.push(`/course/${this.$route.params.course}`);
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

.border {
  border-left: 6px solid blue;
}

.main-course {
  background-color: rgb(177, 215, 244);
}
</style>
