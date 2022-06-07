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
              <h1 class="pa-2 display-3">Bienvenido de nuevo</h1>
            </v-col>

            <v-card
              flat
              rounded
              v-for="(course, index) in courses"
              :key="index"
              @click="go(`/course/${course._id}`)"
            >
              <v-card-title>{{ course.name }}</v-card-title>

              <v-card-subtitle>{{ course.description }}</v-card-subtitle>

              <v-list rounded>
                <v-subheader>lecciones</v-subheader>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item
                    v-for="(lesson, i) in course.lessons"
                    :key="i"
                    @click="selectedItem = i"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="lesson.title"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <v-card-actions> </v-card-actions>
            </v-card>
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
