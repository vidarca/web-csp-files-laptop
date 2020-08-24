import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dbWeb:[]
  },
  mutations: {
    dataWeb(state, baseDatos){
      state.dbWeb = baseDatos
    }
  },
  actions: {
    getData: async function({commit}){
      const data = await fetch("https://web-database-66842.firebaseio.com/.json");
      const dbWeb = await data.json()
      commit('dataWeb', dbWeb)
    }
  },
  modules: {
  }
})
