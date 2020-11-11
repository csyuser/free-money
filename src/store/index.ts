import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:''
  },
  mutations: {
    fetch(state) {
      const token = window.localStorage.getItem('token')
      if (token!=null){state.token = JSON.parse(token)}
    },
    saveToken(state,token){
      state.token = token
    }
  },
  actions: {},
  modules: {}
});
