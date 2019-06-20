import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/demo'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: Demo
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    }
  ]
})
