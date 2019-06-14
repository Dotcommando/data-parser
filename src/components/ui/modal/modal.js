export default {
  name: 'Modal',
  props: {
    title: String,
    name: String,
    animation: {
      type: String,
      default: 'fade'
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
