
import Vue from 'vue'
import Rows from './components/rows'
import Backtop from './components/backtop'
const components = {
    Rows,
    Backtop
}
//
// function install (Vue) {
//     for (const item in components) {
//         if (components[item].name) {
//             Vue.component(components[item].name, components[item])
//         }
//     }
// }
Object.keys(components).forEach(name => {
    Vue.component('Xj'+name, components[name])
})

// /**
//  * Global Install
//  */
// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue)
// }
export  default {
    ...components
}