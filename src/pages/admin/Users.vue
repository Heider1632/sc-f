<template>
    <v-main class="grey lighten-3">
        <app-bar></app-bar>

         <v-container fill-height >
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>

                            <v-btn class="purple--text" text @click="$router.go(-1)">
                                Atras
                                <v-icon>mdi-arrow-left</v-icon>
                            </v-btn>
                        </v-card-title>
                            <v-data-table
                                :headers="headers"
                                :items="users"
                                :search="search"
                                :loading="loading"
                                loading-text="Loading... Please wait"
                            >
                                <template v-slot:[`item.roles`]="{ item }">
                                    <v-chip
                                        :color="getColor(item.roles[0].name)"
                                        dark
                                    >
                                        {{ item.roles[0].name }}
                                    </v-chip>
                                    
                                </template>

                                <template v-slot:[`item.createdAt`]="{ item }">
                                    {{ new Date(item.createdAt).toDateString() }}
                                </template>

                                <template v-slot:[`item.updatedAt`]="{ item }">
                                    {{ new Date(item.updatedAt).toDateString() }}
                                </template>

                                <template v-slot:[`item.actions`]="{  }">
                                    <v-btn class="blue--text" icon @click="$router.go(-1)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>

                                    <v-btn class="red--text" icon @click="$router.go(-1)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                            </v-data-table>
                    </v-card>
                </v-col>
            </v-row>  
        </v-container>
    </v-main>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'HomeAdmin',
    data: () => ({
        headers: [
            {
                text: 'email',
                align: 'start',
                value: 'email',
            },
            { text: 'roles',  filterable: false, value: 'roles' },
            { text: 'creado', value: 'createdAt' },
            { text: 'actualizado', value: 'updatedAt' },
            { text: 'acciones', value: 'actions' },
        ],
        search: '',
        loading: true,
        users: []
    }),
    mounted(){
        let self = this;
        setTimeout(()=> {
            self.getUsers();
        }, 1000)
    },
    computed: {
        ...mapState(['user']),
        date(isoDate){
            var date = new Date(isoDate);
            return date.toISOString().substring(0, 10);
        }
    },
    methods: {
        go(route){
            this.$router.push(route);
        },
        getUsers(){
            this.loading = true;
            this.$http.get(`/users/all`)
            .then(response => {
                console.log(response);
                this.loading = false;
                this.users = response.data;
            })
            .catch(error => {
                this.loading = false;
                console.log(error)
            })
        },
        getColor (role) {
            if (role == 'user') return 'blue'
            else if (role == 'admin') return 'orange'
            else return 'green'
        },
    }
}
</script>