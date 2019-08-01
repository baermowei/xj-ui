<template>
    <div
            class="xj-message__wrapper"
            :style="{
      top: top ? `${top}px` : 'auto'
    }">
        <transition name="move-up" @after-leave="doDestory">
            <div
                    class="xj-message"
                    :class="{
          [`at-message--${type}`]: type}"
                    v-show="visible">
                    <i class="icon xj-message__icon" :class="iconClass"></i>
                    <span class="xj-message__content">{{ message }}</span>

            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                message: '',
                duration: 3000,
                type: 'info',
                icon: '',
                visible: false,
                timer: null,
                closed: false,
                onClose: null,
                top: null
            }
        },
        watch: {
            closed (val) {
                if (val) {
                    this.visible = false
                }
            }
        },
        methods: {
            doDestory () {
                this.$destroy(true)
                this.$el.parentNode.removeChild(this.$el)
            },
            close () {
                this.closed = true
                if (typeof this.onClose === 'function') {
                    this.onClose(this)
                }
            },
            startTimer () {
                if (this.duration) {
                    this.timer = setTimeout(() => {
                        !this.closed && this.close()
                    }, this.duration)
                }
            },
            clearTimer () {
                this.timer && clearTimeout(this.timer)
            }
        },
        mounted () {
            this.startTimer()
        }
    }
</script>
<style lang="scss">
    .xj-message {
        display: inline-block;
        &__wrapper {
            position: fixed;
            left: 0;
            top: 16px;
            width: 100%;
            text-align: center;
            transition: opacity .3s, transform .3s, top .4s;
            pointer-events: none;
        }
        &__icon {
            display: inline-block;
            margin-right: 4px;
            vertical-align: middle;
        }
    }
</style>
