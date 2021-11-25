<template>
  <v-main class="grey lighten-3">
    <app-bar></app-bar>

    <v-container fill-height>
      <v-row>
        <v-col class="mb-4" cols="12">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="interviews"
            item-key="name"
            show-select
            class="elevation-0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Mis cuestionarios</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn @click="$router.go(-1)" text color="primary"
                  >Atrás</v-btn
                >
                <v-btn @click="null" text color="primary">Crear</v-btn>
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
  name: "InterviewTeacher",
  data: () => ({
      singleSelect: false,
        selected: [],
        headers: [
        {
            text: "Titulo",
            align: "start",
            sortable: false,
            value: "title",
        },
        { text: "Descripción", value: "description" },
        { text: "Unidad", value: "lesson.title" },
        { text: "Preguntas", value: "questions" },
        { text: "Retroalimentacion", value: "feedback" },
        ],
        interviews: [],
  }),
};
</script>
