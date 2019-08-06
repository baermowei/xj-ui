<template>
  <div class="xj-tabs"
    :class="{
      'xj-tabs--small': size === 'small',
      'xj-tabs--card': type === 'card',
      'xj-tabs--scroll': scrollable
    }">
    <div class="xj-tabs__header">
      <div class="xj-tabs__extra" v-if="$slots.extra">
        <slot name="extra"></slot>
      </div>
      <div class="xj-tabs__nav">
        <!-- E next btn -->
        <!-- S Tab nav -->
        <div class="xj-tabs__nav-wrap">
          <div class="xj-tabs__nav-scroll" ref="navScroll">
            <div class="xj-tabs-nav" ref="nav" :style="navStyle">
              <div class="xj-tabs-nav__item"
                :class="{
                  'xj-tabs-nav__item--active': index === activeIndex,
                  'xj-tabs-nav__item--disabled': item.disabled,
                  'xj-tabs-nav__item--closable': item.closable
                }"
                v-for="(item, index) in navList" :key="index"
                @click="setNavByIndex(index)">{{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xj-tabs__body" :style="tabsBodyTranslateStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'line',
      validator: val => ['line', 'card'].indexOf(val) > -1
    },
    size: {
      type: String,
      default: 'default',
      validator: val => ['default', 'small'].indexOf(val) > -1
    },
    closable: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      navList: [],
      activeKey: this.value,
      navOffset: 0,
      navStyle: {
        transform: ''
      },
      nextable: false,
      prevable: false
    }
  },
  watch: {
    activeKey () {
      this.$emit('on-change', {
        index: this.activeIndex,
        name: this.activeKey
      })
      this.$nextTick(() => {
        this.scrollToActiveTab()
      })
    }
  },
  computed: {
    scrollable () {
      return this.prevable || this.nextable
    },
    activeIndex () {
      const navList = this.navList
      for (let i = 0, len = navList.length; i < len; i++) {
        const item = navList[i]
        if (item.name === this.activeKey) {
          return i
        }
      }
      return 0
    },
    tabsBodyTranslateStyle () {
      const activeIndex = this.activeIndex
      const translateValue = this.animated ? `${-activeIndex * 100}%` : 0

      return {
        transform: `translate3d(${translateValue}, 0, 0)`
      }
    }
  },
  methods: {
    scrollPrev () {
      if (!this.prevable) return

      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()

      if (currentOffset === 0) return

      const newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0

      this.setOffset(newOffset)
    },
    scrollNext () {
      if (!this.nextable) return

      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()
      const navWidth = this.$refs.nav.offsetWidth

      if (navWidth - currentOffset <= containerWidth) return

      const newOffset = (navWidth - currentOffset > containerWidth * 2) ? currentOffset + containerWidth : navWidth - containerWidth

      this.setOffset(newOffset)
    },
    scrollToActiveTab () {
      if (!this.scrollable) return

      const activeTab = this.$el.querySelector('.xj-tabs-nav__item--active')
      const navScroll = this.$refs.navScroll

      const activeTabBounds = activeTab.getBoundingClientRect()
      const navScrollBounds = navScroll.getBoundingClientRect()
      const currentOffset = this.getCurrentScrollOffset()
      let newOffset = currentOffset

      if (activeTabBounds.left < navScrollBounds.left) {
        newOffset = currentOffset - (navScrollBounds.left - activeTabBounds.left)
      }

      if (activeTabBounds.right > navScrollBounds.right) {
        newOffset = currentOffset + (activeTabBounds.right - navScrollBounds.right)
      }

      this.setOffset(newOffset)
    },
    getCurrentScrollOffset () {
      return this.navOffset
    },
    setOffset (value) {
      this.navOffset = Math.abs(value)
      this.navStyle.transform = `translate3d(-${this.navOffset}px, 0, 0)`
    },
    getTabs () {
      return this.$children.filter(item =>
        item.$options.name === 'TabPane'
      )
    },
    removeHandle (index) {
      const tabs = this.getTabs()
      const tab = tabs[index]
      let activeKey = ''

      if (tab.disabled) return

      this.navList.splice(index, 1)

      this.$emit('on-tab-remove', {
        index,
        name: tab.currentName
      })

      this.$nextTick(() => {
        this.updateNav()
      })

      if (tab.currentName === this.activeKey) {
        const newTabs = this.getTabs()

        if (newTabs.length) {
          const nextAbleTabs = tabs.filter((item, itemIndex) =>
            !item.disabled && itemIndex > index
          )

          const prevAbleTabs = tabs.filter((item, itemIndex) =>
            !item.disabled && itemIndex < index
          )

          if (nextAbleTabs.length) {
            activeKey = nextAbleTabs[0].currentName
          } else if (prevAbleTabs.length) {
            activeKey = prevAbleTabs[prevAbleTabs.length - 1].currentName
          } else {
            activeKey = newTabs[0].currentName
          }
        }

        this.activeKey = activeKey
      }
    },
    updateNav () {
      this.navList = []

      this.getTabs().forEach((item, index) => {
        this.navList.push({
          label: item.label,
          name: item.currentName || index,
          disabled: item.disabled,
          icon: item.icon,
          closable: item.isClosable
        })

        if (!item.currentName) {
          item.currentName = index
        }

        if (index === 0 && !this.activeKey) {
          this.activeKey = item.currentName || index
        }

        if (!this.animated) {
          this.switchTabsWithNoAnimated()
        }
      })
    },
    setNavByIndex (index) {
      const currentName = this.navList[index]

      if (!currentName.disabled) {
        this.activeKey = currentName.name

        if (!this.animated) {
          this.switchTabsWithNoAnimated()
        }
      }
    },
    switchTabsWithNoAnimated () {
      const tabs = this.getTabs()

      tabs.forEach(item => {
        item.show = (item.currentName === this.activeKey)
      })
    },
    updateHandle () {
      const navWidth = this.$refs.nav.offsetWidth
      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()

      if (containerWidth < navWidth) {
        this.prevable = currentOffset !== 0
        this.nextable = currentOffset + containerWidth < navWidth
        if (navWidth - currentOffset < containerWidth) {
          this.setOffset(navWidth - containerWidth)
        }
      } else {
        this.nextable = false
        this.prevable = false
        if (currentOffset > 0) {
          this.setOffset(0)
        }
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateHandle, false)

    this.updateNav()
    setTimeout(() => {
      this.scrollToActiveTab()
    }, 0)
  },
  updated () {
    this.updateHandle()
  }
}
</script>
<style lang="scss">

  .xj-tabs {
    overflow: hidden;
    &__header {

    }
    &__nav {
      position: relative;
      margin-bottom: -1px;
      overflow: hidden;
    }
    &__nav-wrap {
      overflow: hidden;
    }
    &__prev, &__next {
      position: absolute;
      top: 0;
      height: 100%;
      transition: color .3s;
      cursor: pointer;
    }
    &__prev {
      left: 0;
    }
    &__next {
      right: 0;
    }
    &__body {
      white-space: nowrap;
      transition: all .3s;
    }
    &__extra {
      float: right;
      margin-top: 6px;
    }
    &__pane {
      display: inline-block;
      width: 100%;
      white-space: initial;
      vertical-align: top;
    }

  }

  .xj-tabs-nav {
    display: inline-block;
    white-space: nowrap;
    transition: transform .3s;

    /* element */
    &__icon {
      margin-right: 8px;
    }
    &__item {
      position: relative;
      display: inline-block;
      transition: color .3s;
      cursor: pointer;

      &:last-of-type {
        margin-right: 0;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        bottom: 0;
        background-color: green;
        transform: scaleX(0);
        transition: all .15s;
      }
      &:not(&--disabled):hover {

      }

    }
  }

</style>
