import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import Xjui from 'xj-ui'
Vue.use(Xjui)
new Vue({
  render: h => h(App),
}).$mount('#app')
