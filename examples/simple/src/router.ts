import Vue from 'vue'
import Router from 'vue-router'
import { RouteConfig } from 'vue-router'

import About from './views/about.vue'
import NotFound from './views/not-found.vue'

console.log('Router', Router)

Vue.use(Router)

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

export default new Router({
  mode: 'history',
  routes,
})
