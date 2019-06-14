import Header from '@/components/partials/header/header.vue'
import Footer from '@/components/partials/footer/footer.vue'
import Alert from '@/components/modals/alert/alert.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'modal'
    ])
  },
  components: {
    Header,
    Footer,
    ModalAlert: Alert
  }
}
