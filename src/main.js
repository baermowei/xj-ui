import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import Xjui from './index'
// import router from './router'
Vue.use(Xjui)
new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
