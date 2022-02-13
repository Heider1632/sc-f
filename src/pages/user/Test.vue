<template>
    <v-main class="grey lighten-3">
        <app-bar></app-bar>

        <v-container fill-height>
            <v-row justify="center" align="center">
                <template v-if="Array.isArray(test) && test.length > 0">
                    <v-card class="full-heigh mt-4">
                        <v-card-title>
                            <h3>INSTRUCCIONES</h3>

                            <ul>
                                <ol>
                                    Encierre en un círculo la opción "a" o "b" para indicar su respuesta a cada 
                                    pregunta. Por favor seleccione solamente una respuesta para cada pregunta.
                                </ol>
                                <ol>
                                    Si tanto "a" y "b" parecen aplicarse a usted, seleccione aquella que se aplique
                                    más frecuentemente.
                                </ol>
                            </ul>
                        </v-card-title>
                        <v-card-text>
                            <v-form
                                ref="formTest"
                                v-model="valid"
                                lazy-validation
                            >
                                <v-col sm="12" lg="12" md="12" v-for="(item, index) in test" :key="index" >
                                    
                                    <v-select
                                        v-model="item.answer"
                                        :label="item.question"
                                        :items="item.options"
                                        outlined
                                        item-text="label"
                                        item-value="label"
                                        required
                                        @change="setIndexAnswer(item)"
                                    ></v-select>

                                    
                                </v-col>

                                <v-btn
                                    :disabled="!valid"
                                    color="success"
                                    class="mr-4"
                                    @click="validate"
                                >
                                    Enviar
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </template>
                <template v-else>
                    <v-alert color="warning"> Error cargando el test</v-alert>
                </template>
                
            </v-row>
        </v-container>
    </v-main>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'TestStudent',
    data: () => ({
        isLoading: false,
        valid: true,
        test: [],
    }),
    mounted(){
        this.validateStudent();
        this.getTest();
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapMutations('notification', ['open']),
        setIndexAnswer(item){
            let index = this.test.findIndex(data => data === item);
            this.test[index].index = this.test[index].options.findIndex(op => op.label == this.test[index].answer);
        },
        validateStudent(){
            this.$http.get(`/student/one?id=${this.user.student_id}`)
            .then(response => {
                if(response.status == 200){
                    console.log(response.data);
                    if(response.data.learningStyleDimensions.length > 0){
                        this.$router.push('/home')
                    }
                }
            })
        },
        getTest(){
            this.loading = true;
            this.$http.get(`/test/all`)
            .then(response => {
                this.test = response.data;
                this.loading = false;
            }) 
            .catch(error => {
                this.loading = false;
                console.log(error);
            })
        },
        validate(){
            if(this.$refs.formTest.validate){

                let answers = [];

                let a = [0,4,8,12,16,20,24,28,32,36,40];
                let b = [1,5,9,13,17,21,25,29,33,37,41];
                let c = [2,6,10,14,18,22,26,30,34,38,42];
                let d = [3,7,11,15,19,23,27,31,35,39,43];

                answers[0] = [];
                answers[1] = [];
                answers[2] = [];
                answers[3] = [];

                this.test.forEach( (t, index) => {
                    if(a.includes(index)){
                        answers[0].push(t.index);
                    } else if(b.includes(index)){
                        answers[1].push(t.index)
                    } else if (c.includes(index)){
                        answers[2].push(t.index)
                    } else if(d.includes(index)) {    
                        answers[3].push(t.index)
                    }
                });
                
                let learningStyle = [];
                
                answers.forEach((column, index) => {
                    let oneColumn = column.reduce((acc, obj) => obj == 0 ? acc + 1 : acc + 0, 0);
                    let secondColumn = column.reduce((acc, obj) => obj == 1 ? acc + 1 : acc + 0, 0);

                    if(index == 1){
                        if(oneColumn > secondColumn){
                            learningStyle.push("active");
                        } else if(oneColumn == secondColumn) {
                            learningStyle.push("active");
                        } else {
                            learningStyle.push("reflective");
                        }
                    } else if(index == 2){
                        if(oneColumn > secondColumn){
                            learningStyle.push("sensiting");
                        } else if(oneColumn == secondColumn) {
                            learningStyle.push("sensiting");
                        } else {
                            learningStyle.push("intuitive");
                        }
                    } else if(index == 3){
                        if(oneColumn > secondColumn){
                            learningStyle.push("visual");
                        } else if(oneColumn == secondColumn) {
                            learningStyle.push("visual");
                        } else {
                            learningStyle.push("verbal");
                        }
                    } else if(index == 4) {
                        if(oneColumn > secondColumn){
                            learningStyle.push("sequential");
                        } else if(oneColumn == secondColumn) {
                            learningStyle.push("sequential");
                        } else {
                            learningStyle.push("global");
                        }
                    }
                    
                });

                this.$http.post('/test/user/update', { learningStyle: learningStyle, student: this.user.student_id })
                .then(response => {
                    if(response.status == 200){
                        this.$router.push('/');
                    } else {
                        let args = {
                            color: "error",
                            message: "Error!",
                            submessage: "algo sucedio mal",
                            pos: ["top", "center"]
                        };

                        this.open(args);
                    }
                })
            } else {
                let args = {
                    color: "error",
                    message: "Error!",
                    submessage: "tienes que completar todas las preguntas.",
                    pos: ["top", "center"]
                };
                
                this.open(args);
            }
        }
    }
}
</script>