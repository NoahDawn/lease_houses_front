import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

/* 抽离state*/
const state = {
  loginUserMS: {
    id: 0
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
