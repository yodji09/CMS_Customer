<template>
  <v-card class="d-flex grey" width="250" height="330" >
    <v-layout row wrap justify-center>
      <v-card-text class="my-0">
        <v-text-field disabled :value="list.Product.name" class="my-0"></v-text-field>
        <v-text-field disabled :value="list.Product.stock" class="my-0" label="Stock:"></v-text-field>
        <v-text-field v-model="quantity" type="number" min="1" :max="list.Product.stock" label="Quantity:">
        </v-text-field>
        <p class="my-0">Total Price: </p>
        {{Convert(list.Product.price)}}
      </v-card-text>
      <v-card-actions class="my-0">
      <v-btn @click.prevent="Remove(list)" class="orange"><v-icon>mdi-delete</v-icon> Remove</v-btn>
      </v-card-actions>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'buyingCard',
  props: ['list'],
  data () {
    return {
      quantity: 1,
      price: null
    }
  },
  methods: {
    Convert (values) {
      values = this.quantity * values
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
    Remove (item) {
      const payload = {
        item: item,
        token: localStorage.token
      }
      this.$store.dispatch('deleteWishlist', payload)
        .then(({ data }) => {
          this.$store.commit('SET_MESSAGE', data.message)
          this.$store.commit('DELETE_WISHLIST', payload)
          setInterval(() => {
            this.$store.commit('SET_MESSAGE', '')
          }, 2000)
        })
    }
  },
  watch: {
    quantity: function (val) {
      const payload = {
        item: this.list,
        quantity: this.quantity
      }
      this.$store.commit('UPDATE_QUANTITY', payload)
    }
  }
}
</script>

<style>

</style>
