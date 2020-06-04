<template>
  <v-container>
    <v-card align="center">
    <p class="my-0 success">{{message}}</p>
      <v-row>
        <v-col
          v-for="list in wishlist"
          :key="list.name"
          class="d-flex child-flex my-0"
          cols="4"
        >
          <v-card left tile class="d-flex" width="250" height="330">
            <v-img
              :src="list.Product.image_url"
              aspect-ratio="1"
              class="grey lighten-2"
            >
            </v-img>
          </v-card>
          <buyingCard right :list="list"></buyingCard>
        </v-col>
        <v-col class="d-flex child-flex my-0"
          cols="12">
          <v-spacer></v-spacer>
            <v-row>
            Total Price: {{totalPrice}}
            </v-row>
            <v-spacer></v-spacer>
            <v-row>
            <v-btn class="green" @click.prevent="checkout(wishlist)">
              checkout
            </v-btn>
            </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import buyingCard from '../components/buying-card'
export default {
  name: 'wishList',
  data () {
    return {

    }
  },
  components: {
    buyingCard
  },
  computed: {
    totalPrice () {
      let values = 0
      this.$store.state.wishlist.forEach(element => {
        values += element.Product.price * element.quantity
      })
      this.$store.commit('SET_TOTALPRICE', values)
      if (values === 0) {
        return 'Rp. ' + values + ',-'
      }
      let rupiah = ''
      const valuesrev = values.toString().split('').reverse().join('')
      for (let i = 0; i < valuesrev.length; i++) {
        if (i % 3 === 0) rupiah = rupiah + valuesrev.substr(i, 3) + '.'
      }
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',-'
    },
    wishlist () {
      return this.$store.state.wishlist
    },
    message () {
      return this.$store.state.message
    }
  },
  created () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
  },
  methods: {
    checkout (list) {
      const payload = {
        token: localStorage.token,
        listCheckOut: list
      }
      this.$store.dispatch('checkOut', payload)
    }
  }
}
</script>

<style>

</style>
