<template>
  <v-app>
    <v-container v-for="item in Categories" :key="item.id">
    <v-toolbar class="red">{{item.name}} </v-toolbar>
      <v-layout row justify-around align-center>
        <v-row v-for="product in item.Products" :key="product.id">
          <v-layout class="px-5 py-5">
            <Card :product="product" />
          </v-layout>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Card from '../components/card'
export default {
  name: 'home',
  data () {
    return {

    }
  },
  components: {
    Card
  },
  computed: {
    wishlist () {
      return this.$store.state.wishlist
    },
    Categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style>

</style>
