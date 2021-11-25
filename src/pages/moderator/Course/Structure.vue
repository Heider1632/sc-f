<template>
  <v-main class="grey lighten-3">
    <app-bar></app-bar>

    <v-container fill-height>
      <v-row>
        <v-col class="mb-4" cols="12">
          <v-data-table
            :headers="headers"
            :items="lesson.structure"
            item-key="name"
            class="elevation-0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>{{ lesson.title }}</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn @click="$router.go(-1)" text color="primary"
                  >Atrás</v-btn
                >
                <v-btn
                  @click="
                    $router.push(
                      `/moderator/course/${$route.params.id}/lessons/add`
                    )
                  "
                  text
                  color="primary"
                  >Crear</v-btn
                >
              </v-toolbar>
            </template>
            <template v-slot:[`item.type`]="{ item }">
              {{ types[item.type] }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-2"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="editLesson(item)"
                    >{{
                      item.type == "evaluation"
                        ? "mdi-table-account"
                        : "mdi-animation-play"
                    }}</v-icon
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="primary" dark
                      >Opening from the bottom</v-toolbar
                    >
                    <v-card-text>
                      <div class="text-h2 pa-12">Hello world!</div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
// import { mapState } from 'vuex';
export default {
  name: "StructureLessonCourseTeacher",
  mounted() {
    this.getLesson();
  },
  data: () => ({
    headers: [
      {
        text: "Tipo",
        align: "start",
        sortable: true,
        value: "type",
      },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    types: {
      introduction: "Introducción",
      definition: "Definición",
      description: "Descripción",
      example: "Ejemplo",
      activity: "Actividad",
      evaluation: "Evalucación",
    },
    lesson: null,
  }),
  methods: {
    getLesson() {
      this.$http
        .get(`/lesson/one?id=${this.$route.params.lesson}`)
        .then((response) => {
          console.log(response);
          this.lesson = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
