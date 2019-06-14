export default {
  namespaced: true,
  state: {
    status: 100,
    stopped: false
  },
  mutations: {
    setStatus (state, status) {
      state.status = status
    },
    startCountdown (state) {
      state.stopped = false
      this.dispatch('sample/countDown')
    },
    stopCountdown (state) {
      state.stopped = true
    }
  },
  actions: {
    countDown (state) {
      let countdown = state.state.status
      let timer = setTimeout(() => {
        countdown--

        if (countdown < 1 || state.state.stopped) {
          clearTimeout(timer)
          return
        }

        this.commit('sample/setStatus', countdown)
        this.dispatch('sample/countDown')
      }, 1000)
    }
  }
}
