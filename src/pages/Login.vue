<template>
  <v-main>
    <v-container fill-height fluid class="section-container">
      <v-row class="signin">
        <v-col lg="6" md="6" class="pa-0 ma-0" v-if="!responsive">
          <v-img :src="require('@/assets/images/sifilis.jpg')" class="full-height-img" ></v-img>
        </v-col>
        <v-col lg="6" md="6" sm="12" class="right">
          <validation-observer ref="observerLogin">
            <v-form @submit.prevent="submit" >
              <validation-provider v-slot="{ errors }" name="Name" rules="required|email">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  label="Correo"
                  required
                  solo 
                  type="email"
                  autocomplete="username"
                ></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="email" rules="required">
                <v-text-field
                  v-model="password"
                  :error-messages="errors"
                  label="Contraseña"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  required
                  solo
                  :type="showPass ? fieldTypes.password : 'password'"
                  @focus="handleType"
                  @blur="handleType"
                  autocomplete="new-password"
                ></v-text-field>
              </validation-provider>
              <div class="text-center">
                <v-row>
                    <v-col cols="12">
                      <v-btn class="signin-btn" :disabled="loading" type="submit" color="white" dark>
                        <template v-if="!loading">
                          Continuar
                          <v-icon color="#3f51b5">mdi-arrow-right</v-icon>
                        </template>
                        <template v-else>
                          <v-progress-circular
                            indeterminate
                            color="primary"
                          ></v-progress-circular>
                        </template>
                      </v-btn>
                    </v-col>
                </v-row>
              </div>
            </v-form>
          </validation-observer>
        
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import { extend, ValidationProvider, setInteractionMode, ValidationObserver } from 'vee-validate'
import { mapMutations } from "vuex";
setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    responsive: false,
    loading: false,
    username: '',
    email: '',
    password: null,
    showPass: false,
    fieldTypes: {
      password: 'text',
    }
  }),
  mounted(){
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  methods: {
    ...mapMutations('notification', ['open']),
    ...mapMutations(['setUser']),
    onResponsiveInverted() {
      if (window.innerWidth < 960) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
    handleType(event) {
      const { srcElement, type } = event;
      const { name, value } = srcElement;

      if(type === 'blur' && !value) {
        this.fieldTypes[name] = 'text'
      } else {
        this.fieldTypes[name] = 'password'
      }
    },
    async submit() {
      const valid = await this.$refs.observerLogin.validate()
      if (valid) {
        this.loading = true;
        let userAgent = navigator.userAgent;

        Object.filter = (obj, predicate) => 
          Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {});

        var filtered = Object.filter(this.$device, device => device == true);
        var device = Object.keys(filtered)[0]

        this.$http.post('/auth/signin', {
          email: this.email,
          password: this.password,
          device: device,
          userAgent: userAgent
        })
        .then(async response => {
          
          if(response.status == 200){
            
            localStorage.setItem("token", response.data.accessToken);

            this.setUser({
              id: response.data.id,
              email: response.data.email,
              roles: response.data.roles
            })

            let r = await this.$http.get('/cycle/all', { params: {
                stimulus: "logging",
                id: response.data.id,
                name: response.data.name           
            }});

            console.log(r);
            
            this.loading = false;
            this.$store.dispatch("autoLogin");
          } else {  
            let args = {
              color: "error",
              message: "Error!",
              submessage: "algo sucedio mal",
              pos: ["top", "center"]
            };
            this.loading = false;
            this.open(args);
          }
        })
        .catch(error => {
          let args = {
            color: "error",
            message: "Error!",
            submessage: error.response.data.message,
            pos: ["top", "center"]
          };
          this.loading = false;
          this.open(args);
        });
      }
    },
    clear() {
      // you can use this method to clear login form
      this.email = ''
      this.password = null
      this.$refs.observerLogin.reset()
    },
    register(){
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="scss" scoped>
.section-container {
  box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
  box-sizing: border-box;
  .signin {
    padding: 0;
    width: 100%;
    height: calc(100vh - 150px);
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px;
      box-sizing: border-box;
      background: #3f51b5;
      color: #fff;
      h2 {
        text-align: center;
        margin: 30px 0;
      }
      .signin-btn {
        width: 100%;
        color: #3f51b5;
      }
    }
  }
}

.full-height-img{
  width:100%; 
  height:100%; 
}
</style>
