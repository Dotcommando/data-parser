export default {
  name: 'Button',
  props: {
    type: String,
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    submit: {
      default: false
    }
  }
}
