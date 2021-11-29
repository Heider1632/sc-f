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
                        <v-list-item-group v-model="inputStructure" color="primary">
                            <v-list-item
                                v-for="(structure, index) in lesson ? lesson.structure : []"
                                :key="index"
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

                    </v-list>
                    </v-sheet>
                </v-col>

                <v-col>
                    <v-sheet
                        min-height="69vh"
                        rounded="lg"
                    >
                        <v-container fluid fill-height class="grey lighten-4" v-if="showFeedback">
                            <v-layout justify-center align-center>
                                <v-flex>
                                    {{ this.assessment.feedbacks[feedback].name }}
                                </v-flex>
                                <v-flex>
                                    <v-btn block color="primary" @click="rebuild">Intentarlo de nuevo</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card elevation="0" height="69vh" class="d-flex flex-column scroll" v-else>
                            <v-card-title>
                                <template v-if="lesson.structure[inputStructure] && lesson.structure[inputStructure].type == 'evaluation'">
                                    {{ this.assessment.title }}
                                </template>
                                <template v-else>
                                    {{ lesson.structure[inputStructure].data.resource.description ? lesson.structure[inputStructure].data.resource.description : ""  }}
                                </template>
                            </v-card-title>

                            <v-card-text>
                                <template v-if="lesson.structure[inputStructure] && lesson.structure[inputStructure].type == 'evaluation'">
                                    <v-form ref="forminterview" class="mx-2" lazy-validation>
                                        <template v-for="(question, key) in assessment.questions">
                                            <v-select :key="key" outlined :label="question.name" v-model="question.user" :items="question.options" item-text="label" :rules="[v => !!v || 'Debes completar esta pregunta']" required />
                                        </template>
                                    </v-form>
                                    
                                </template>
                                <template v-else>
                                    <video-embed :params="{ autoplay: 1}" :src="lesson.structure[inputStructure].data.resource.url"></video-embed>
                                </template>
                            </v-card-text>

                            <v-spacer></v-spacer>

                            <v-card-actions >
                                <v-layout row wrap align-items-end justify-center>

                                    <v-flex shrink class="mr-5" align-items-center>
                                        <h4 class="display-5">¿Qué te parecio este recurso? 😊</h4>
                                    </v-flex>

                                    <v-flex shrink >
                                        <material-rating :value="lesson.structure[inputStructure].data ? lesson.structure[inputStructure].data.rating : rating" color="orange"></material-rating>
                                    </v-flex>

                                    <v-flex shrink class="mr-5">
                                        <v-btn color="primary" text @click="finish" v-if="inputStructure == 5">
                                            Finalizar
                                            <v-icon>mdi-check</v-icon>
                                        </v-btn>

                                        <v-btn color="primary" text @click="next" v-else>
                                            Siguiente
                                            <v-icon>mdi-arrow-right</v-icon>
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
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Lesson',
    data: () => ({
        rating: 0,
        loading: false,
        lesson: null,
        types: {
            "introduction" : "Introducción",
            "definition" : "Definición",
            "description" : "Descripción",
            "example" : "Ejemplo",
            "activity" : "Actividad",
            "evaluation" : "Evalucación",
        },
        assessments: [],
        assessment: null,
        logs: [],
        note: 0,
        feedback: 0,
        isLoading: false,
        showFeedback: false,
        id_case: null,
    }),
    mounted(){
        this.getLesson();
    },
    computed: {
        ...mapState(['user']),
        ...mapState('lesson',  ['currentStructure', 'trace']),
        inputStructure: {
            get() {
                return this.currentStructure;
            },
            set(val) {
                this.nextStructure(val);
            },
        },
    },
    methods: {
        ...mapMutations('lesson', ['nextStructure', 'setTrace']),
        ...mapMutations('notification', ['open']),
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
                this.getAssessment();
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
                if(response.status == 200){

                    this.id_case = response.data.id_case;

                    this.lesson.structure = this.lesson.structure.map((s, index) => {
                        if(index > 0){
                            s.isBlock = true;
                        } else {
                            s.isBlock = false;
                        }
                        
                        s.data = response.data.plan[index];
                        return s;
                    })
                }
            })
            .catch(e => {
                console.error(e.message);
            })
        },
        async next(){

            if(this.currentStructure < this.lesson.structure.length){

                if(this.currentStructure != 6){

                    let resourcesIds = this.lesson.structure.map(s => { if(s.data){ return s.data.resource._id }});

                    this.assessments.push({
                        assessment: Math.random(5),
                        time_use: this.lesson.structure[this.currentStructure].data.time_use,
                        like: this.lesson.structure[this.currentStructure].data.rating
                    })

                    if(this.assessments.length == 1){
                        let response = await this.$http.post('/trace/create', {
                            student: this.user.student_id,
                            course: this.$route.params.course,
                            lesson: this.$route.params.lesson,
                            resources: resourcesIds,
                            assessments: this.assessments,
                            logs: this.logs
                        })

                        if(response.status == 200){
                            console.log(response.data);
                            this.setTrace(response.data._id);
                        }
                    } else {

                        await this.$http.post('/trace/update', {
                            id: this.trace,
                            resources: resourcesIds,
                            assessments: this.assessments,
                            logs: this.logs
                        })
                    }
                }

                this.nextStructure(this.inputStructure + 1);
                this.lesson.structure[this.currentStructure].isBlock = false;

            }
        },
        async finish(){

            let valid = this.$refs.forminterview.validate();

            if(valid){
                 //put teacher note (default 5)
                this.assessments = [];

                let sum = 0;
                
                this.assessment.questions.map(as => {
                    if(as.response == as.user){
                        let note = 5 / this.assessment.questions.length;
                        sum= sum + note;
                    }
                });

                this.note = sum;

                if(this.note == 5){

                    let structureIds = this.lesson.structure.map(s => s._id);

                    let resourcesIds = this.lesson.structure.map(s => { if(s.data){ return s.data }});

                    //save case and rebuild interface to next lesson
                    this.$http.post('/metacore/save', {
                        id_student: this.user.student_id,
                        id_course: this.$route.params.course,
                        id_lesson: this.$route.params.lesson,
                        resources: resourcesIds,
                        structure: structureIds,
                    })
                    .then(response => {
                        if(response.status == 200){
                            this.$http.post('/metacore/review', {
                                id_case: response.data._id,
                                success: true,
                                errors: false
                            })
                            .then(response => {

                                if(response.status == 200){
                                    this.$http.post('/progress/create', {
                                        id_student: this.user.student_id,
                                        id_course: this.$route.params.course,
                                        id_lesson: this.$route.params.lesson,
                                    })
                                    .then(response => {
                                        if(response.status == 200){
                                            this.$router.push(`/course/${this.$route.params.course}`)
                                        }
                                    })
                                    .catch(error => {
                                        console.error(error.message);
                                    })   
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                                            
                        }
                    })
                    .catch(e => {
                        console.error(e.message);
                    })
                } else {

                    this.showFeedback = true;
                }     
            } else {
                
                let args = {
                    color: "error",
                    message: "Error!",
                    submessage: "Debes completar todas las preguntas",
                    pos: ["top", "center"]
                };

                this.loading = false;
                this.open(args);
            }       
        },
        getAssessment(){
            this.$http.get(`/assessment/one?lesson=${this.$route.params.lesson}`)
            .then(response => {
                if(response.status == 200){


                    this.assessment = response.data;                
                }
            })
            .catch(e => {
                console.error(e.message);
            })
        },
        rebuild(){

            this.showFeedback = false;

            let structureIds = this.lesson.structure.map(s => s._id);

            let resourcesIds = this.lesson.structure.map(s => { if(s.data){ return s.data.resource._id }});

            this.$http.post('/metacore/initial', {
                id_student: this.user.student_id,
                id_course: this.$route.params.course,
                id_lesson: this.$route.params.lesson,
                structure: structureIds,
                resources: resourcesIds
            })
            .then(response => {
                if(response.status == 200){

                    this.nextStructure(0);

                    this.id_case = response.data.id_case;

                    this.lesson.structure = this.lesson.structure.map( (s, index) => {
                        if(index > 0){
                            s.isBlock = true;
                        } else {
                            s.isBlock = false;
                        }
                        
                        s.data = response.data.plan[index];
                        return s;
                    })
                } 
            })
            .catch(e => {
                console.error(e.message);
            })
        }
    }
}
</script>
<style scoped>
.flexcard {
  display: flex;
  flex-direction: column;
}

.scroll {
   overflow-y: scroll
}

</style>