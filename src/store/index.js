import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dbWeb:[],
    dpResponsive: false,
  },
  mutations: {
    dataWeb(state, baseDatos){
      state.dbWeb = baseDatos
    },
    isResponsive(state){
      if(window.innerWidth >= 768){
        state.dpResponsive = false
      }else if(window.innerWidth < 768){
        state.dpResponsive = true
      }
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
