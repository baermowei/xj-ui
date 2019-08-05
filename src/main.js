import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import Message from './components/message'
Vue.prototype.$Message = Message

import Xjui from './index'
Vue.use(Xjui)
new Vue({
  render: h => h(App),
}).$mount('#app')
