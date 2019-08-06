
import Dropdown from './src/dropdown.vue'

Dropdown.install = function (Vue) {
    Vue.component('Xj'+Dropdown.name, Dropdown)
}

export default Dropdown