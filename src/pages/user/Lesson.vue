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
                            <p class="font-weight-semibold mb-1">{{ lesson ? lesson.title : "" }}</p>
                            <v-progress-linear
                            color="red lighten-2"
                            buffer-value="20"
                            stream
                            ></v-progress-linear>
                        </v-toolbar-title>

                        <v-divider class="mx-2"  inset vertical></v-divider>

                        <div class="flex-grow-1"></div>
                        <v-btn
                            color="primary"
                            dark
                            text
                            class="mb-2"
                            @click="$router.go(-1)"
                        >
                            Atras
                            <v-icon small>mdi-arrow-left</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-col>
                
                <v-col cols="4">
                    <v-sheet rounded="lg">
                    <v-list rounded color="transparent">
                        <v-list-item-group v-model="currentStructure" color="primary">
                            <v-list-item
                                v-for="(structure, index) in lesson ? lesson.structure : []"
                                :key="index"
                                link
                                :disabled="structure.isBlock"
                            >
                                <v-list-item-content>
                                    <v-list-item-icon v-if="structure.isBlock">
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
                        
                        <v-divider class="my-2"></v-divider>
                        
                        <v-list-item
                            color="grey lighten-4"
                            @click="getLesson"
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

                <v-col>
                    <v-sheet
                        min-height="69vh"
                        rounded="lg"
                    >
                        <v-card elevation="0" height="69vh" class="d-flex flex-column" >
                            <v-toolbar flat rounded>
                                <v-toolbar-title>
                                    <p class="font-weight-semibold mb-1">
                                        {{ lesson.structure[currentStructure].data.resource.description ? lesson.structure[currentStructure].data.resource.description : ""  }}
                                    </p>
                                </v-toolbar-title>

                                <v-divider class="mx-2"  inset vertical></v-divider>

                                <div class="flex-grow-1"></div>
                                
                            </v-toolbar>
                            <material-stopwatch ref="stopwatch"></material-stopwatch>

                            <v-card-text>
                                {{ lesson.structure[currentStructure].data.resource.url ? lesson.structure[currentStructure].data.resource.url : ""  }}
                            </v-card-text>

                            <v-spacer></v-spacer>

                            <v-card-actions>
                                <v-layout row wrap align-items-end justify-center>
                                    <v-flex shrink class="mr-5">
                                        <h3 class="display-5">¿Qué te parecio este recurso? 😊</h3>
                                        <material-rating :value="lesson.structure[currentStructure].data.rating ? lesson.structure[currentStructure].data.rating : rating" color="orange"></material-rating>
                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap justify-end>
                                    <v-flex shrink class="mr-5">
                                        <v-btn color="primary" text @click="next">
                                            Siguiente
                                        </v-btn>
                                    </v-flex>
                                </v-layout>

                            </v-card-actions>
                        </v-card>
                        
                    
                   
                    </v-sheet>
                </v-col>
            </v-row>
            </template>
        </v-container>
    </v-main>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: 'Lesson',
    data: () => ({
        rating: 0,
        currentStructure: 0,
        loading: false,
        lesson: null,
        types: {
            "introduction" : "Introducción",
            "definition" : "Definición",
            "description" : "Descripción",
            "example" : "Ejemplo",
            "activity" : "Actividad",
            "evaluation" : "Evalucación",
        }
    }),
    mounted(){
        this.getLesson();
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        openSettings() {
            this.$refs.stopwatch.openSettingsDialog();
        },
        openHelp() {
            this.$refs.stopwatch.openHelpDialog();
        },
        getLesson(){
            this.loading = true;
            this.$http.get(`/lesson/one?id=${this.$route.params.lesson}`)
            .then(response => {

                this.lesson = response.data;

                this.getResources();

                this.loading = false;
            }) 
            .catch(error => {
                this.loading = false;
                console.log(error);
            })
        },
        getResources(){

            let structureIds = this.lesson.structure.map(s => s._id);


            this.$http.post('/metacore/initial', {
                id_student: this.user.student_id,
                id_course: this.$route.params.course,
                id_lesson: this.$route.params.lesson,
                structure: structureIds,
            })
            .then(response => {
                console.log(response);
                if(response.status == 200){
                    this.lesson.structure = this.lesson.structure.map( (s, index) => {
                        if(index > 0){
                            s.isBlock = true;
                        } else {
                            s.isBlock = false;
                        }
                        
                        s.data = response.data[index];

                        return s;
                    })
                }
            })
            .catch(e => {
                console.error(e.message);
            })
        },
        next(){
            if(this.currentStructure <= this.lesson.structure.length){
                this.currentStructure = this.currentStructure + 1;
                this.lesson.structure[this.currentStructure].isBlock = false;
            }
        },
        getAssessment(){

        }
    }
}
</script>
<style scoped>
.flexcard {
  display: flex;
  flex-direction: column;
}

</style>