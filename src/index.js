
import Vue from 'vue'
import Rows from './components/rows'
import Backtop from './components/backtop'
import Carousel from './components/carousel'
import CarouselItem from './components/carousel/src/item'
import XjImage from './components/image'
import Menu from './components/menu'
import Submenu from './components/menu/src/submenu'
import MenuItem from './components/menu/src/menu-item'
import Message from './components/message'
import Modal from './components/modal'
import Pagination from './components/pagination'
import Dropdown from './components/dropdown'
import Popover from './components/popover'
import Tabs from './components/tabs'
import TabPane from './components/tabs/src/tab-pane'
Vue.prototype.$Message = Message

const components = {
    Rows,
    Backtop,
    Carousel,
    CarouselItem,
    Menu,
    Submenu,
    MenuItem,
    Modal,
    Pagination,
    Dropdown,
    Popover,
    Tabs,
    TabPane
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

Vue.component("XjImage", XjImage)


// /**
//  * Global Install
//  */
// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue)
// }
export  default {
    ...components
}