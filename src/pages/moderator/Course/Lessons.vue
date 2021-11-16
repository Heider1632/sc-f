<template>
    <v-main class="grey lighten-3">
        <app-bar></app-bar>

        <v-container fill-height >
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
                        <v-btn @click="$router.go(-1)" text color="primary">Atrás</v-btn>
                        <v-btn @click="null"  text color="primary">Crear</v-btn>
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
    name: 'LessonCourseTeacher',
    mounted(){
        this.getLessons();
    },
    data: () => ({
        headers: [
            {
                text: "Nombre",
                align: "start",
                sortable: false,
                value: "title",
            },
            { text: "Order", value: "order" },
        ],
        lessons: []
    }),
    methods: {
        getLessons(){
            this.$http.get(`/lesson/course?id=${this.$route.params.id}`)
            .then((response) => {
                this.lessons = response.data;
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }
}
</script>