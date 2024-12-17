import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    goods: null,
    cart: []
  },
  getters: {
    getGoods(state) {
      return state.goods;
    },
    getCart(state) {
      return state.cart;
    }
  },
  mutations: {
    fetchAllGoods(state) {
      axios.get('https://fakestoreapi.com/products')
      .then(resp => {
        state.goods = resp.data;
      });
    },
    fetchCategoryGoods(state, cat) {
      axios.get(`https://fakestoreapi.com/products/category/${cat}`)
      .then(resp => {
        state.goods = resp.data;
      });
    },
    addCart(state, id) {
      state.cart.push(id);
    },
    addOldGoods(state, oldGoods) {
      state.cart = oldGoods;
    }
  },
  actions: {
  },
  modules: {
  }
})
