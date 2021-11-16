<template>
  <v-main class="grey lighten-3">
    <app-bar></app-bar>

    <v-container fill-height>
      <v-row>
        <v-col class="mb-4" cols="12">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="students"
            item-key="name"
            show-select
            class="elevation-0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Estudianes</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn @click="$router.go(-1)" text color="primary">Atrás</v-btn>
                <v-btn @click="enroll"  text color="primary">Matricular</v-btn>
              </v-toolbar>
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
  name: "StudentCourseTeacher",
  mounted() {
    this.getStudents();
  },
  data: () => ({
    singleSelect: false,
    selected: [],
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Apellido", value: "lastname" },
      { text: "Dimensiones de Aprendizaje", value: "learningStyleDimensions" },
    ],
    students: [],
  }),
  methods: {
    getStudents() {
      this.$http
        .get(`/student/all`)
        .then((response) => {
          
          this.students = response.data;
          this.selected = [];
          this.students.map(student => {
            if(student.course.includes(this.$route.params.id)){
              this.selected.push(student);
            }
          })
        })
        .catch((error) => {
          console.error(error);
        });
    },
    enroll(){

      var studentsIds = this.selected.map(s => s._id);

      this.$http.post('/course/enroll', { 
        id: this.$route.params.id,
        students: studentsIds 
      })
      .then(response => {
        if(response.data){
          this.getStudents()
        }
      })
      .catch(error => {
        console.error(error.message);
      })
    }
  },
};
</script>
