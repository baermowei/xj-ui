
import Vue from 'vue'
import Rows from './components/rows'
import Backtop from './components/backtop'
import Carousel from './components/carousel'
import CarouselItem from './components/carousel/src/item'
import Image from './components/image'
import Menu from './components/menu'
import Submenu from './components/menu/src/submenu'
import MenuItem from './components/menu/src/menu-item'
import Message from './components/message'
Vue.prototype.$Message = Message
const components = {
    Rows,
    Backtop,
    Carousel,
    CarouselItem,
    Image,
    Menu,
    Submenu,
    MenuItem
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