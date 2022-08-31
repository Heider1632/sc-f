<template>
  <v-main class="grey lighten-3">
    <app-bar></app-bar>

    <v-container fill-height>
      <v-row>
        <v-col class="mb-4" cols="4">
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
            <div>
              <!-- 1. Cree el botón en el que se hará clic para seleccionar un archivo -->
              <v-btn 
                  color="primary" 
                  rounded 
                  dark 
                  :loading="isSelecting" 
                  @click="handleFileImport"
              >
                  Upload File
              </v-btn>

              <!-- Cree una entrada de archivo que se ocultará pero se activará con JavaScript -->
              <input 
                  ref="uploader" 
                  class="d-none" 
                  type="file" 
                  @change="onFileChanged"
              >
          </div>
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
import { mapState, mapMutations } from "vuex";
import zipcelx from "zipcelx";

export default {
  name: "HomeTeacher",
  data: () => ({
    search: "",
    selectedItem: 0,
    loading: true,
    courses: [],
    isSelecting: false,
    loading: false
  }),
  mounted() {
    this.getCourses();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations("notification", ["open"]),
    handleFileImport() {
        this.isSelecting = true;

        // Después de obtener el enfoque al cerrar FilePicker, vuelva el estado del botón a la normalidad
        window.addEventListener('focus', () => {
            this.isSelecting = false
        }, { once: true });
        
        // Haga clic en el gatillo en FileInput
        this.$refs.uploader.click();
    },
    async onFileChanged(e){

        // Haga lo que necesite con el archivo, como leerlo con FileReader
        var files = e.target.files, f = files[0];
        var $this = this;
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, {type: 'array'});
          let sheetName = workbook.SheetNames[0]
          /* DO SOMETHING WITH workbook HERE */

          let worksheet = workbook.Sheets[sheetName];
          let body = XLSX.utils.sheet_to_json(worksheet);
          //enviar al algoritmo
          $this.$http.post("/data/upload", body)
          .then(async (response) => {
            if (response.status == 200) {
              console.log(response);
            } else {
              let args = {
                color: "error",
                message: "Error!",
                submessage: "algo sucedio mal",
                pos: ["top", "center"],
              };
              $this.loading = false;
              $this.open(args);
            }
          })
          .catch((error) => {
            let args = {
              color: "error",
              message: "Error!",
              submessage: error.response.data.message,
              pos: ["top", "center"],
            };
            $this.loading = false;
            $this.open(args);
          });
          
        };
        reader.readAsArrayBuffer(f);
    },
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
                  value: "Evaluación",
                  type: "string"
                },
                { 
                  value: "Nota",
                  type: "string"
                },
                { 
                  value: "Tiempo",
                  type: "number"
                },
                { 
                  value: "User key",
                  type: "number"
                },
                { 
                  value: "Introducción",
                  type: "string"
                },
                { 
                  value: "Definición",
                  type: "string"
                },
                { 
                  value: "Descripción",
                  type: "string"
                },
                { 
                  value: "Ejemplo",
                  type: "string"
                },
                { 
                  value: "Actividad",
                  type: "string"
                },
                { 
                  value: "US 1",
                  type: "number"
                },
                { 
                  value: "US 2",
                  type: "number"
                },
                { 
                  value: "US 3",
                  type: "number"
                },
                { 
                  value: "US 4",
                  type: "number"
                },
                { 
                  value: "US 5",
                  type: "number"
                },
                { 
                  value: "US 6",
                  type: "number"
                },
                { 
                  value: "US 7",
                  type: "number"
                },
                { 
                  value: "US 6",
                  type: "number"
                },
                { 
                  value: "US 9",
                  type: "number"
                },
                { 
                  value: "US 10",
                  type: "number"
                },
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
