import { mapState } from 'vuex'

export default {
  name: 'SamplePage',
  computed: {
    ...mapState([
      'sample'
    ])
  },
  mounted () {
    if (this.sample.stopped) {
      this.$store.commit('sample/startCountdown')
    }
  },
  beforeDestroy () {
    this.$store.commit('sample/stopCountdown')
  }
}
