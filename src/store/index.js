import Vue from 'vue'
import Vuex from 'vuex'
import modal from '@/store/modal'
import sample from '@/store/sample'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modal,
    sample
  }
})
