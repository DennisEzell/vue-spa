import { app, router } from './app'

router.onReady(() => {
  app.$mount('#app') //Will insert the app.js code into the spot within index.html where <div id="app">
})
