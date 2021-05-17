<template>
  <div class="xj-timeline__item"
    :class="{
      'xj-timeline__item--last': isLastItem,
      'xj-timeline__item--pending': isPendingItem,
      'xj-timeline__item--custom': !!this.$slots.dot,
      [`xj-timeline__item--${status}`]: status
    }"
    :style="{
      'color': status
    }">
    <div class="xj-timeline__tail"></div>
    <div class="xj-timeline__dot">
      <slot name="dot"></slot>
    </div>
    <div class="xj-timeline__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AtTimelineItem',
  props: {
    color: {
      type: String,
      default: 'blue'
    }
  },
  data () {
    return {
      colors: {
        blue: 'default',
        red: 'error',
        green: 'success',
        yellow: 'warning'
      },
      defaultColor: 'blue',
      isLastItem: false,
      isPendingItem: false,
    }
  },
  computed: {
    status () {
      const colorKey = this.color
      const status = colorKey ? ( this.colors[colorKey] || colorKey ) : this.colors[this.defaultColor]
      return status
    }
  },
  methods: {
    checkForLast () {
      const children = this.$parent.$children
      const index = children.indexOf(this)
      const isPending = this.$parent.pending
      const lastItemIndex = isPending ? (children.length - 2) : (children.length - 1)

      this.isLastItem = index === lastItemIndex

      if (isPending) {
        this.isPendingItem = (index === lastItemIndex + 1)
      }
    }
  },
  mounted () {
    this.checkForLast()
  }
}
</script>


