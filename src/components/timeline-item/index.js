import TimelineItem from '../timeline/src/timeline-item.vue'

TimelineItem.install = function (Vue) {
  Vue.component('Xj'+TimelineItem.name, TimelineItem)
}

export default TimelineItem
