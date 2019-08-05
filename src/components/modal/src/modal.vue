<template>
  <div>
    <transition name="fade">
      <div class="at-modal__mask" v-show="visible" @click="handleMaskClick"></div>
    </transition>
    <!-- / mask -->
    <div
      class="at-modal__wrapper"
      :class="{
        'at-modal--hidden': !wrapShow,
        'at-modal--confirm': isIconType,
        [`at-modal--confirm-${type}`]: isIconType
      }"
      @click.self="handleWrapperClick">
      <transition name="fade">
        <div class="at-modal" :style="modalStyle" v-show="visible">
          <div class="at-modal__body">
            <slot>
              <p>{{ content }}</p>
              <div class="at-modal__input" v-if="showInput">
                <at-input v-model="inputValue" :placeholder="inputPlaceholder" @keyup.enter.native="handleAction('confirm')" ref="input"></at-input>
              </div>
            </slot>
          </div>
          <i v-if="isIconType" class="icon at-modal__icon" :class="iconClass"></i>
          <span v-if="showClose" class="at-modal__close" @click="handleAction('cancel')"><i class="xjicon iconshanchu"></i></span>
        </div>
      </transition>
    </div>
    <!-- / wrap -->
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      title: String,
      content: String,
      value: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String
      },
      okText: {
        type: String
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      showHead: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      showInput: {
        type: Boolean,
        default: false
      },
      width: {
        type: [Number, String],
        default: 520
      },
      closeOnPressEsc: {
        type: Boolean,
        default: true
      },
      styles: {
        type: Object,
        default () {
          return {}
        }
      },
      type: String
    },
    data () {
      return {
        wrapShow: false,
        showCancelButton: true,
        showConfirmButton: true,
        action: '',
        visible: this.value,
        inputValue: null,
        inputPlaceholder: '',
        callback: null
      }
    },
    computed: {
      iconClass () {
        const classArr = {
          'success': 'icon-check-circle',
          'error': 'icon-x-circle',
          'warning': 'icon-alert-circle',
          'info': 'icon-info'
        }

        return classArr[this.type] || ''
      },
      isIconType () {
        return ['success', 'error', 'warning', 'info'].indexOf(this.type) > -1
      },
      modalStyle () {
        const style = {}
        const styleWidth = {
          width: `${this.width}px`
        }

        Object.assign(style, styleWidth, this.styles)

        return style
      },
    },
    watch: {
      value (val) {
        this.visible = val
      },
      visible (val) {
        if (val) {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.wrapShow = true
        } else {
          this.timer = setTimeout(() => {
            this.wrapShow = false
          }, 300)
        }
      }
    },
    methods: {
      doClose () {
        this.visible = false
        this.$emit('input', false)
        this.$emit('on-cancel')

        if (this.action && this.callback) {
          this.callback(this.action, this)
        }
      },
      handleMaskClick (evt) {
        if (this.maskClosable) {
          this.doClose()
        }
      },
      handleWrapperClick (evt) {
        if (this.maskClosable) {
          this.doClose()
        }
      },
      handleAction (action) {
        this.action = action

        if (action === 'confirm') {
          this.$emit('input', false)
          this.$emit('on-confirm')
        }

        this.doClose()
      },
      handleKeyCode (evt) {
        if (this.visible && this.showClose) {
          if (evt.keyCode === 27) { // Escape
            this.doClose()
          }
        }
      }
    },
    mounted () {
      if (this.visible) {
        this.wrapShow = true
      }

      document.addEventListener('keydown', this.handleKeyCode)
    },
    beforeDestory () {
      document.removeEventListener('keydown', this.handleKeyCode)
    }
  }
</script>
<style lang="scss">

  .at-modal {
    position: relative;
    width: auto;
    margin: 0 auto;
    border: none;
    outline: none;

    /* elements */
    &__mask {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      &--hidden {
        display: none;
      }
    }
    &__wrapper {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      outline: 0;
    }

    &__close {
      position: absolute;
      top: 16px;
      right: 16px;
      line-height: 1;
      overflow: hidden;
      cursor: pointer;
    }



    /* modifiers */
    &--hidden {
      display: none !important;
    }
  }

</style>