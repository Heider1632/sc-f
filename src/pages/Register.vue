<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="7" class="left" :style="cssProps">
      </v-col>
      <v-col cols="5" class="right">
        <h2>SIGNUP</h2>
        <validation-observer ref="observerRegister">
          <v-form @submit.prevent="submitRegister">
            <validation-provider v-slot="{ errors }" name="Name" rules="required|email">
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Email"
                required
                outlined
                dark
                filled
                type="email"
                autocomplete="off"
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="email" rules="required">
              <v-text-field
                v-model="password"
                :error-messages="errors"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                required
                outlined
                dark
                filled
                :type="showPass ? fieldTypes.password : 'password'"
                @focus="handleType"
                @blur="handleType"
                autocomplete="off"
              ></v-text-field>
            </validation-provider>
            <div class="text-center">
              <v-row>
                <v-col cols="8">
                  <v-btn class="signin-btn" type="submit" color="white" dark>
                    Sign Up
                  </v-btn>
                </v-col>
                <v-col cols="4">
                  <v-btn class="signin-btn" color="white" dark @click="login">
                    Sign In
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-form>
        </validation-observer>
      </v-col>
    </v-row>
  </section>
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
  name: 'Register',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    email: '',
    password: null,
    showPass: false,
    hasFormLogin: true,
    cssProps: {
      background: `url(${require('@/assets/images/bg-initial-2.jpg')}) center no-repeat`,
      backgroundSize: `cover`,
      backgroundAttachment: `fixed`
    },
    fieldTypes: {
      password: 'text',
    }
  }),
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
     handleType(event) {
      const { srcElement, type } = event;
      const { name, value } = srcElement;

      if(type === 'blur' && !value) {
        this.fieldTypes[name] = 'text'
      } else {
        this.fieldTypes[name] = 'password'
      }
    },
    async submitRegister() {
      const valid = await this.$refs.observerRegister.validate()
      if (valid) {
        this.$http.post('/auth/signup', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(response => {
          if(response.status == 200){
            console.log(response);
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
        .catch(e => console.log(e.message));
      }
    },
    clear() {
      // you can use this method to clear login form
      this.username = ''
      this.email = ''
      this.password = null
      this.$refs.observerRegister.reset();
    },
    login(){
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.section-container {
  background-size: cover;
  background-attachment: fixed;
  box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
  box-sizing: border-box;
  .signin {
    padding: 0;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
    .left {
      padding: 30px;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      color: #30ac7c;
    }
    .right {
      padding: 30px;
      box-sizing: border-box;
      background: #30ac7c;
      color: #fff;
      h2 {
        text-align: center;
        margin: 30px 0;
      }
      .signin-btn {
        width: 100%;
        color: #30ac7c;
      }
    }
  }
}
</style>
