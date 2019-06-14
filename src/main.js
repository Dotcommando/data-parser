import Vue from 'vue'
import App from '@/app/app.vue'
import router from '@/router/router'
import store from '@/store/index'
import { sync } from 'vuex-router-sync'
import Modal from '@/components/ui/modal/modal.vue'
import Button from '@/components/ui/button/button.vue'

Vue.config.productionTip = false

sync(store, router)

Vue.component('modal', Modal)
Vue.component('v-button', Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
