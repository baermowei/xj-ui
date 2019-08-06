
import Popover from './src/popover.vue'

Popover.install = function (Vue) {
    Vue.component('Xj'+Popover.name, Popover)
}

export default Popover