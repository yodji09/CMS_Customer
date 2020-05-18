<template>
  <v-app class="black">
    <v-content>
      <v-container v-if="isLoading">
        <Loading></Loading>
      </v-container>
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
                <v-toolbar-title>Welcome! Please login first</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @keyup.native.enter.prevent="login">
                  <v-text-field
                    label="E-mail"
                    name="Email"
                    prepend-icon="email"
                    type="text"
                    v-model="emailLogin"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    :type="type"
                    v-model="passwordLogin"
                  ><v-icon slot="append" @click.prevent="showPassword">mdi-eye</v-icon>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions v-if="emailLogin !== '' && passwordLogin !== ''">
                <v-spacer></v-spacer>
                <v-btn @click.prevent="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Loading from './loading'
export default {
  name: 'Login',
  components: {
    Loading
  },
  data () {
    return {
      emailLogin: '',
      passwordLogin: '',
      icon: 'eye',
      fillingEmail: 'envelope',
      type: 'password',
      disableLogin: true,
      isLoading: false,
      message: ''
    }
  },
  methods: {
    showPassword () {
      this.type === 'password' ? this.type = 'text' : this.type = 'password'
      this.icon === 'eye' ? this.icon = 'eye-fill' : this.icon = 'eye'
    },
    login () {
      this.isLoading = true
      const payload = {
        email: this.emailLogin.toLowerCase(),
        password: this.passwordLogin
      }
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.acces_token)
          this.$store.commit('SET_TOKEN', data.acces_token)
          this.$store.commit('SET_LOGIN', true)
        })
        .catch(err => {
          console.log(err.response.data.msg)
        })
        .finally(() => {
          this.isLoading = false
        })
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
  #loginForm {
    width: 100%;
  }
</style>
