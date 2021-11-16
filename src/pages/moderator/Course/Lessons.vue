<template>
  <v-main class="grey lighten-3">
    <app-bar></app-bar>

    <v-container fill-height>
      <v-row>
        <v-col class="mb-4" cols="12">
          <v-data-table
            :headers="headers"
            :items="lessons"
            item-key="name"
            show-select
            class="elevation-0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Unidades</v-toolbar-title>
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
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                class="mr-2"
                color="primary"
                @click="$router.push(`/moderator/course/${$route.params.id}/lesson/${item.id}/structure`)"
                >mdi-border-all</v-icon
              >
              <v-dialog transition="dialog-top-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-2"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="editLesson(item)"
                    >mdi-pencil</v-icon
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
              <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteLesson(item)"
                    >mdi-delete</v-icon
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
  name: "LessonCourseTeacher",
  mounted() {
    this.getLessons();
  },
  data: () => ({
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "title",
      },
      { text: "Order", value: "order", sortable: true },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    
    lessons: [],
  }),
  methods: {
    getLessons() {
      this.$http
        .get(`/lesson/course?id=${this.$route.params.id}`)
        .then((response) => {
          this.lessons = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editLesson(lesson) {},
    deleteLesson(lesson) {},
  },
};
</script>
