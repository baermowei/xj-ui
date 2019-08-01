
import Vue from 'vue'
import HelloWorld from './components/HelloWorld'
const components = {
    HelloWorld
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