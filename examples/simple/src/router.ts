import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import About from './views/about.vue'
import NotFound from './views/not-found.vue'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [{
  path: '/',
  redirect: '/about',
}, {
  path: '/about',
  component: About,
}, {
  path: '*',
  component: NotFound,
}]

export default new VueRouter({
  mode: 'history',
  routes,
})
