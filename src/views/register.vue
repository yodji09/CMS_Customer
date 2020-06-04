<template>
  <v-app class="black">
      <div v-if="isLoading">
        <Loading></Loading>
      </div>
      <div style="font-size : 20px !important;" v-if="!isLoading">
        <v-container v-if="!isLoading"
        class="fill-height"
        fluid
        >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="indigo"
                dark
                flat
              >
                <v-toolbar-title>Welcome! Join us to shop your life</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @keyup.native.enter.prevent="login">
                <v-flex>
                  <v-text-field
                    label="Full Name"
                    name="Name"
                    :rules="nameRules"
                    prepend-icon="person"
                    type="text"
                    v-model="name"
                  ></v-text-field>

                  <v-text-field
                    v-model="email"
                    name="Email"
                    prepend-icon="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-flex>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    :rules="passwordRules"
                    prepend-icon="lock"
                    :type="type"
                    v-model="password"
                  ><v-icon slot="append" @click.prevent="showPassword">mdi-eye</v-icon>
                  </v-text-field>
                  <v-text-field
                    id="password"
                    label="Confirm Password"
                    name="password"
                    prepend-icon="lock"
                    :rules="confirmRules"
                    :type="type"
                    v-model="confirmPassword"
                  ><v-icon slot="append" @click.prevent="showPassword">mdi-eye</v-icon>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <div class="text-center">
                <v-snackbar
                  v-model="snackbar"
                  :timeout="timeout"
                >
                  {{ message }}
                  <v-btn
                    color="blue"
                    text
                    @click.prevent="snackbar = false"
                  >
                    Close
                  </v-btn>
                </v-snackbar>
              </div>
              <v-card-actions v-if="email !== '' && password !== '' && confirmPassword !== '' && name !== ''">
                <v-spacer></v-spacer>
                <v-btn @click.prevent="registerUser" color="primary">create</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </div>
  </v-app>
</template>

<script>
import axios from 'axios'
import Loading from './loading'

export default {
  name: 'register',
  components: {
    Loading
  },
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      type: 'password',
      requiredEmail: '',
      baseUrl: 'https://shielded-bastion-44955.herokuapp.com/',
      message: '',
      requiredPassword: '',
      requiredConfirm: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 7) || 'Password at least 8 at length',
        v => (v && /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d#$@!%&*?]{8,50}$/.test(v)) || 'Password must containt at least one number, one lower case and one upper case'
      ],
      confirmRules: [
        v => !!v || 'Confirm password is required',
        v => (v && v === this.password) || 'Password doesn\'t match'
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      snackbar: false,
      timeout: 2000,
      isLoading: false
    }
  },
  methods: {
    showPassword () {
      this.type === 'password' ? this.type = 'text' : this.type = 'password'
      this.icon === 'eye' ? this.icon = 'eye-fill' : this.icon = 'eye'
    },
    registerUser () {
      this.isLoading = true
      axios({
        url: this.baseUrl + 'user/register',
        method: 'POST',
        data: {
          name: this.name,
          email: this.email.toLowerCase(),
          password: this.password,
          confirmPassword: this.confirmPassword
        }
      })
        .then(({ data }) => {
          return axios({
            method: 'POST',
            url: this.baseUrl + 'user/login',
            data: {
              email: this.email.toLowerCase(),
              password: this.password
            }
          })
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.acces_token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('money', data.money)
          this.$store.commit('SET_MONEY', data.money)
          this.$store.commit('SET_TOKEN', data.acces_token)
          this.$store.commit('SET_LOGIN', true)
          this.$router.push('/')
        })
        .catch(err => {
          this.message = err.response.data.msg
          this.snackbar = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    created () {
      if (localStorage.getItem('token')) {
        this.$store.commit('SET_LOGIN', true)
      }
    }
  }
}
</script>

<style scoped>
  .form-style {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 15px;
    justify-content: center;
    align-items: center;
  }
  #regisForm {
    width: 100%;
  }
</style>
