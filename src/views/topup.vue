<template>
  <v-container>
  {{message}}
    <v-form>
      <v-text-field clearable :rules="[v => v <= 100000000 || 'Cannot set value more than Rp. 100.000.000']" label="Total TopUp" type="number" v-model="topup" max="100000000"></v-text-field>
    </v-form>
    <v-btn icon @click.prevent="Payment"><v-icon>mdi-transfer</v-icon>TopUp</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'topup',
  data () {
    return {
      topup: null,
      message: ''
    }
  },
  methods: {
    Payment () {
      const payload = {
        token: localStorage.token,
        money: this.topup
      }
      this.$store.dispatch('topup', payload)
        .then(({ data }) => {
          this.message = data.message
          localStorage.money = data.money
          this.$store.commit('SET_MONEY', data.money)
          this.topup = null
          setInterval(() => {
            this.message = ''
          }, 3000)
        })
        .catch(err => {
          this.$store.commit('SET_MESSAGE', err.response.data.msg)
        })
    }
  }
}
</script>

<style>

</style>
