<template>
    <div class="xj-dropdown" v-clickoutside="handleClose" ref="trigger">
        <div class="xj-dropdown__trigger"><slot></slot></div>

        <transition name="slide-up" @after-leave="doDestory">
            <div class="xj-dropdown__popover" ref="popover" v-show="show">
                <slot name="menu" class="at-dropdown-menu"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    import Clickoutside from '../../../directives/clickoutside'
    import PopoverMixin from '../../../mixins/popover'

    export default {
        name: 'Dropdown',
        directives: { Clickoutside },
        mixins: [PopoverMixin],
        props: {
            trigger: {
                type: String,
                default: 'hover',
                validator: val => ['click', 'hover', 'focus'].indexOf(val) > -1
            },
            placement: {
                type: String,
                default: 'bottom',
                validator: val => ['top', 'top-left', 'top-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right'].indexOf(val) > -1
            }
        },
        mounted () {
            this.$on('menu-item-click', this.handleMenuItemClick)
        },
        methods: {
            handleClose () {
                this.show = false
            },
            handleMenuItemClick (name) {
                this.show = false
                this.$emit('on-dropdown-command', name)
            }
        }
    }
</script>
<style lang="scss">

    .xj-dropdown {
        display: inline-block;

        &__popover {
            position: absolute;
            overflow: visible;
        }
    }

    .xj-dropdown-menu {
        position: relative;
        width: inherit;
        list-style: none;

        &__item {
            display: block;
            transition: all .3s;
            cursor: pointer;
        }
    }

</style>
