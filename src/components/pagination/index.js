import Pagination from './src/pagination.vue'

Pagination.install = function (Vue) {
  Vue.component('Xj'+Pagination.name, Pagination)
}

export default Pagination
