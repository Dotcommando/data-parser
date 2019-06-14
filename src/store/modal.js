import Vue from 'vue'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
    open (state, { name, data = true }) {
      Vue.set(state, name, data)
    },
    close (state, name) {
      Vue.delete(state, name)
    }
  }
}
