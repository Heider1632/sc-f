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
            <v-row>
                <v-col cols="12">
                    <v-toolbar flat rounded>
                        <v-toolbar-title>
                            <p class="font-weight-semibold mb-1">{{ course ? course.name : "" }}</p>
                            <v-progress-linear
                            color="red lighten-2"
                            buffer-value="20"
                            stream
                            ></v-progress-linear>
                        </v-toolbar-title>

                        <v-divider class="mx-2"  inset vertical></v-divider>

                        <div class="flex-grow-1"></div>
 
                    </v-toolbar>
                </v-col>
                
                <v-col cols="12">
                    <v-sheet rounded="lg">
                    <v-list rounded color="transparent">
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item
                                v-for="(lesson, index) in course ? course.lessons : []"
                                :key="index"
                                link
                                :disabled="lesson.isBlock"
                            >
                                <v-list-item-content>
                                    <v-list-item-icon v-if="lesson.isBlock">
                                        <v-icon>mdi-disable</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                        {{ types[lesson.type] }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ lesson.title }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn icon @click="goLesson(lesson._id)">
                                        <v-icon color="grey lighten-1">mdi-arrow-right</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                        
                        <v-divider class="my-2"></v-divider>
                        
                        <v-list-item
                            color="grey lighten-4"
                            @click="getCourse"
                        >
                            <v-list-item-icon>
                                <v-icon>refresh</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title >
                                    Actualizar
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    </v-sheet>
                </v-col>
            </v-row>
            </template>
        </v-container>

        <v-footer>
            <h1>Universidad de Cordoba</h1>
        </v-footer>
    </v-main>
</template>
<script>
export default {
    name: 'Course',
    data: () => ({
        rating: 0,
        selectedItem: 0,
        loading: false,
        course: null,
        types: {
            "introduction" : "Introducción",
            "definition" : "Definición",
            "example" : "Ejemplo",
            "activity" : "Actividad",
            "evaluation" : "Evalucación",
        }
    }),
    mounted(){
        this.getCourse();
    },
    methods: {
        getCourse(){
            this.loading = true;
            this.$http.get(`/course/one?id=${this.$route.params.id}`)
            .then(response => {
                this.course = response.data;

                this.course.lessons = this.course.lessons.sort((a, b) => a.order > b.order && 1 || -1)

                this.course.lessons.map( (lesson, index) => {
                    if(index > 0){
                        this.course.lessons[index].isBlock = true;
                    }
                })

                this.loading = false;
            }) 
            .catch(error => {
                this.loading = false;
                console.log(error);
            })
        },
        goLesson(id){
            this.$router.push(`/course/${this.course._id}/lesson/${id}`);
        }
    }
}
</script>