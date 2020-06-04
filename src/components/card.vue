<template>
  <v-card
    class="mx-auto"
    width="300"
    height="400"
    align="center"
  >
    <v-img
      class="red  --text align-end"
      width="250"
      height="200"
      :src="product.image_url"
    >
    </v-img>
    <v-layout column align-center>
      <v-card height="150" flat>
        <v-card-subtitle>{{product.name}}</v-card-subtitle>
        <v-card-text class="text--primary">
          <div>{{Convert(product.price)}} </div>
          <div>Stock left: {{product.stock}}</div>
        </v-card-text>
      </v-card>
      <v-card-actions v-if="isLogin">
        <v-btn
          color="orange"
          text
          @click.prevent="addToWishList(product)"
          v-if="!disabled"
        >
        <v-icon>mdi-cart-arrow-down</v-icon> Wish List
        </v-btn>
        <v-btn v-if="disabled" :disabled="disabled"><v-icon>mdi-cart</v-icon>Added to Wishlist</v-btn>
      </v-card-actions>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    Convert (values) {
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
    addToWishList (item) {
      const payload = {
        ProductId: item.id,
        token: localStorage.token
      }
      this.$store.dispatch('addWishlist', payload)
        .then(({ data }) => {
          this.disabled = true
          this.$store.commit('UPDATE_WISHLIST', data.Wishlist)
        })
        .catch(err => {
          this.$store.commit('SET_MESSAGE', err.response.data.msg)
        })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
      const list = this.$store.state.wishlist
      list.forEach(element => {
        if (element.Product.id === this.$props.product.id) {
          this.disabled = element.disabled
        }
      })
    }
  }
}
</script>

<style>

</style>
