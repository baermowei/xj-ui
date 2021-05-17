<template>
  <div class="xj-timeline"
    :class="{
      'xj-timeline--pending': pending
    }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AtTimeline',
  props: {
    pending: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    pending () {
      this.$children.forEach(child => {
        child.checkForLast()
      })
    }
  }
}
</script>
<style lang="scss">
.xj-timeline__item {
  position: relative;
  padding: 0 0 12px;
}
.xj-timeline__item--default .xj-timeline__dot {
  color: #78a4fa;
  border-color: #78a4fa;
}
.xj-timeline__item--success .xj-timeline__dot {
  color: #13ce66;
  border-color: #13ce66;
}
.xj-timeline__item--error .xj-timeline__dot {
  color: #ff4949;
  border-color: #ff4949;
}
.xj-timeline__item--warning .xj-timeline__dot {
  color: #ffc82c;
  border-color: #ffc82c;
}
.xj-timeline__item--custom .xj-timeline__dot {
  top: -2px;
  left: -4px;
  width: 20px;
  height: 20px;
  font-size: 16px;
  text-align: center;
  border: 0;
}
.xj-timeline__item--custom .xj-timeline__dot .icon {
  display: block;
  margin-top: 2px;
}
.xj-timeline__item--last .xj-timeline__tail {
  display: none;
}
.xj-timeline__item--last .xj-timeline__content {
  min-height: 48px;
}
.xj-timeline__tail {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 5px;
  border-left: 2px solid #ececec;
}
.xj-timeline__dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 12px;
  height: 12px;
  border: 2px solid transparent;
  border-radius: 50%;
  background-color: #fff;
}
.xj-timeline__content {
  position: relative;
  top: -5px;
  padding: 0 0 8px 24px;
  font-size: 12px;
}
.xj-timeline--pending .xj-timeline__item--pending .xj-timeline__tail {
  display: none;
}
.xj-timeline--pending .xj-timeline__item--last .xj-timeline__tail {
  display: inline-block;
  border-left-style: dotted;
}
</style>
