import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
Vue.use(VueAxios, axios, Qs)
axios.defaults.baseURL = 'http://localhost:3000' // 需要请求的后端域名

Vue.config.productionTip = false

let bus = new Vue()
Vue.prototype.bus = bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
