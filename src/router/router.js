import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import HelloWorld from '@/pages/hello-world/hello-world.vue'
import SamplePage from '@/pages/sample-page/sample-page.vue'
import ElseOneSample from '@/pages/else-one-sample/else-one-sample.vue'
import NotFound from '@/pages/not-found/not-found.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sample-page',
      name: 'SamplePage',
      component: SamplePage
    },
    {
      path: '/else-one-sample/:id',
      name: 'ElseOneSampleID',
      component: ElseOneSample
    },
    {
      path: '/else-one-sample',
      name: 'ElseOneSample',
      component: ElseOneSample
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ],
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/sample-page') {
    store.dispatch('sample/countDown')
  }

  next()
})

export default router
