import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseUrl = 'https://shielded-bastion-44955.herokuapp.com/'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: '',
    wishlist: [],
    totalPrice: null,
    message: '',
    categories: [],
    history: [],
    money: null
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_TOKEN (state, payload) {
      state.token = payload
    },
    UPDATE_WISHLIST (state, payload) {
      payload.disabled = true
      state.wishlist.push(payload)
    },
    UPDATE_QUANTITY (state, payload) {
      const index = state.wishlist.indexOf(payload.item)
      if (index !== -1) state.wishlist[index].quantity = payload.quantity
    },
    SET_TOTALPRICE (state, payload) {
      state.totalPrice = payload
    },
    SET_WISHLIST (state, payload) {
      state.wishlist = payload
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_HISTORY (state, payload) {
      state.history = payload
    },
    DELETE_WISHLIST (state, payload) {
      const index = state.wishlist.indexOf(payload.item)
      if (index !== -1) state.wishlist.splice(index, 1)
    },
    SET_MONEY (state, payload) {
      state.money = payload
    }
  },
  actions: {
    login (context, payload) {
      return axios({
        url: baseUrl + 'user/login',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchProduct (context, payload) {
      return axios({
        url: baseUrl + 'product',
        method: 'GET',
        headers: {
          token: payload.token
        }
      })
    },
    fetchCategory (context, payload) {
      axios({
        url: baseUrl + 'category',
        method: 'GET',
        headers: {
          token: payload.token
        }
      })
        .then(({ data }) => {
          context.commit('SET_CATEGORIES', data.Category)
        })
        .catch(err => {
          context.commit('SET_MESSAGE', err.response.data.msg)
        })
    },
    fetchWishlist (context, payload) {
      return axios({
        url: baseUrl + 'transaction',
        method: 'GET',
        headers: {
          token: payload.token
        }
      })
    },
    addWishlist (context, payload) {
      return axios({
        url: baseUrl + 'transaction',
        method: 'POST',
        headers: {
          token: payload.token
        },
        data: {
          ProductId: payload.ProductId
        }
      })
    },
    updateUser (context, payload) {
      return axios({
        url: baseUrl + 'user/transaction',
        method: 'PUT',
        headers: {
          token: payload.token
        },
        data: {
          money: context.state.totalPrice
        }
      })
    },
    checkOut (context, payload) {
      payload.listCheckOut.forEach(element => {
        element.quantity = parseInt(element.quantity)
      })
      axios({
        url: baseUrl + 'transaction/checkout',
        method: 'put',
        headers: {
          token: payload.token
        },
        data: {
          listCheckOut: payload.listCheckOut,
          totalPrice: context.state.totalPrice
        }
      })
        .then(({ data }) => {
          context.commit('SET_MESSAGE', data.message)
          context.commit('SET_WISHLIST', [])
          context.dispatch('fetchCategory', payload)
          setInterval(() => {
            context.commit('SET_MESSAGE', '')
          }, 3000)
          return context.dispatch('updateUser', payload)
        })
        .then(({ data }) => {
          localStorage.money = data.money
          context.commit('SET_MONEY', data.money)
        })
        .catch(err => {
          context.commit('SET_MESSAGE', err.response.data.message)
        })
    },
    checkOutHistory (context, payload) {
      axios({
        url: baseUrl + 'transaction/history',
        method: 'get',
        headers: {
          token: payload.token
        }
      })
        .then(({ data }) => {
          context.commit('SET_HISTORY', data.Transaction)
        })
        .catch(err => {
          context.commit('SET_MESSAGE', err.response.data.msg)
        })
    },
    deleteWishlist (context, payload) {
      return axios({
        url: baseUrl + 'transaction/' + parseInt(payload.item.id),
        method: 'delete',
        headers: {
          token: payload.token
        }
      })
    },
    topup (context, payload) {
      return axios({
        url: baseUrl + 'user/topup',
        method: 'put',
        headers: {
          token: payload.token
        },
        data: {
          money: payload.money
        }
      })
    }
  },
  modules: {
  }
})
