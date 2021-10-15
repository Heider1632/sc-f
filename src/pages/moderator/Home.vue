<template>
    <v-main class="grey lighten-3">
        <app-bar></app-bar>

        <v-container fill-height >
            <v-row>
                <v-col class="mb-4" cols="12">
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

                <v-card flat rounded v-for="(course, index) in courses" :key="index" @click="go(`/course/${course._id}`)">
                    <v-card-title>{{ course.name }}</v-card-title>
                    
                    <v-card-subtitle>{{ course.description }}</v-card-subtitle>

                    <v-list rounded>
                        <v-subheader>lecciones</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item v-for="(lesson, i) in course.lessons" :key="i" @click="selectedItem = i">
                                <!-- <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon> -->
                                <v-list-item-content>
                                    <v-list-item-title v-text="lesson.title"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>

                    <v-card-actions>
                    
                    </v-card-actions>    
                </v-card>
            </v-row>  
        </v-container>
    </v-main>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'HomeTeacher',
    data: () => ({
        search: '',
        selectedItem: 0,
        loading: true,
        courses: []
    }),
    mounted(){
        let self = this;
        setTimeout(()=> {
            self.getCourses();
        }, 1000)
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        go(route){
            this.$router.push(route);
        },
    }
}
</script>