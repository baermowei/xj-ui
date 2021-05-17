import Timeline from './src/timeline.vue'

Timeline.install = function (Vue) {
  Vue.component('Xj'+Timeline.name, Timeline)
}

export default Timeline
