<template>
  <v-data-table
    :headers="headers"
    :items="history"
    :items-per-page="10"
    class="elevation-0"
    loading
  >
    <template v-slot:item.image="{ item }">
      <v-img class="my-3" :src="item.Product.image_url" :alt="item.name" height="100" width="100"></v-img>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'history',
  data () {
    return {
      headers: [
        {
          text: 'Image',
          align: 'start',
          sortable: false,
          value: 'image'
        },
        { text: 'Product Name', value: 'Product.name' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Price', value: 'price' },
        { text: 'Date', value: 'updatedAt' }
      ]
    }
  },
  computed: {
    history () {
      this.$store.state.history.forEach(element => {
        element.updatedAt = element.updatedAt.split('T')[0]
        const values = element.price
        if (values === 0) {
          return 'Rp. ' + values + ',-'
        }
        let rupiah = ''
        const valuesrev = values.toString().split('').reverse().join('')
        for (let i = 0; i < valuesrev.length; i++) {
          if (i % 3 === 0) rupiah = rupiah + valuesrev.substr(i, 3) + '.'
        }
        element.price = 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',-'
      })
      return this.$store.state.history
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      const payload = {
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('checkOutHistory', payload)
    }
  }
}
</script>

<style>

</style>
