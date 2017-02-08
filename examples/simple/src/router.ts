import * as Vue from 'vue'
import * as Router from 'vue-router'
import { RouteConfig } from 'vue-router'

import * as About from './views/about.vue'
import * as NotFound from './views/not-found.vue'

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
