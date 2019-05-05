import Vue from 'vue'
import store from './vuex/index.js'
import AppLayout from './theme/Layout.vue'
import router from './router'

const app = new Vue({
  router,
  ...AppLayout,
  store
})

//app.js is feeding data (via its export) into client-entry.js
export { app, router, store }
