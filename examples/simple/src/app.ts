import * as Vue from 'vue'
import router from './router'
import * as App from './components/app.vue'

export { router }

export const createApp = () =>
  new Vue({
    render: h => h(App),
    router,
  })

export default createApp()
