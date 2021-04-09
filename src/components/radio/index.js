import Radio from './src/radio.vue'

Radio.install = function (Vue) {
  Vue.component('Xj'+Radio.name, Radio)
}

export default Radio
