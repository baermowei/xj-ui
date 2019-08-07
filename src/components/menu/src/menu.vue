<template>
    <ul
            class="at-menu"
            :class="[
      mode ? `xj-menu--${mode}` : ''
    ]"
            :style="ulStyle"><slot></slot></ul>
</template>

<script>
    import Emitter from '../../../mixins/emitter'
    import { findComponentsDownward } from '../../../utils/util'

    export default {
        name: 'Menu',
        mixins: [Emitter],
        props: {
            mode: {
                type: String,
                default: 'inline',
                validator: val => ['inline', 'horizontal', 'vertical'].indexOf(val) > -1
            },
            activeName: [String, Number],
            inlineCollapsed: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '240px'
            },
            router: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                currentActiveName: this.activeName
            }
        },
        computed: {
            ulStyle () {
                const style = {}

                if (this.mode === 'inline' || this.mode === 'vertical') {
                    style.width = this.width
                }

                return style
            }
        },
        watch: {
            activeName (val) {
                this.currentActiveName = val
            },
            currentActiveName () {
                this.updateActiveName()
            }
        },
        methods: {
            updateActiveName () {
                if (typeof this.currentActiveName === 'undefined') {
                    this.currentActiveName = -1
                }

                const submenus = findComponentsDownward(this, 'Submenu')

                if (submenus && submenus.length) {
                    submenus.forEach(submenu => {
                        submenu.$emit('on-update-active', false)
                    })
                }
                this.broadcast('MenuItem', 'on-update-active', this.currentActiveName)
            },
            routeToMenuItem (item) {
                const route = item.to || {}
                item.replace ? this.$router.replace(route) : this.$router.push(route)
            }
        },
        mounted () {
            this.updateActiveName()
            this.$on('on-menu-item-select', item => {
                this.currentActiveName = item.name
                this.$emit('on-select', item.name)

                if (this.router) {
                    this.routeToMenuItem(item)
                }
            })
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/mixins";
    .xj-menu {
        position: relative;

        /* element */
        &__item {
            position: relative;
            display: block;
            list-style: none;
            transition: color .2s;
            cursor: pointer;
            z-index: 1;

            a {
                display: inline-block;
                width: 100%;
                height: 100%;
            }

            .xj-menu__item-link {
                width: 100%;
            }

            &--disabled {
                cursor: not-allowed;

                .xj-menu__item-link {
                    cursor: not-allowed;
                    pointer-events: none;

                    &::after {
                        display: none;
                    }
                }
            }
        }
        &__submenu {
            &--disabled {
                cursor: not-allowed;
            }
        }
        &__submenu-title {
            position: relative;
            cursor: pointer;
        }
        .xj-dropdown__popover {
            width: 100%;
        }
        .xj-dropdown-menu {
            max-height: none;

            .xj-menu__item {
                @include ellipsis();
                display: block;
                line-height: 1.5;
                white-space: nowrap;
                transition: all .3s;
                cursor: pointer;

                &--disabled {
                    cursor: not-allowed;
                }
            }
        }

        /* modifier */
        &--horizontal,
        &--vertical,
        &--inline {
            z-index: auto;
        }

        &--horizontal {
            position: relative;

            .xj-menu__item,
            .xj-menu__submenu {
                position: relative;
                float: left;
            }
            .xj-menu__item {
                &.xj-menu__item--active {
                    .xj-menu__item-link {


                        a {

                        }
                        &::after {
                            transform: scaleX(1);
                        }
                    }
                }
                &--disabled {
                }
            }
            .xj-menu__item-link {
                display: inline-block;

                &::after {
                    content: '';
                    position: absolute;
                    display: inline-block;
                    width: 100%;
                    height: 2px;
                    left: 0;
                    background-color: #D1AA76;
                    bottom: 0;
                    transform: scaleX(0);
                    transition: all .15s;
                }
                &:hover,
                &.router-link-active {

                    &::after {
                        transform: scaleX(1);
                    }
                }
            }
            > .xj-menu__submenu {
                &:hover,
                &.xj-menu__submenu--active {
                    &::after {
                        transform: scaleX(1);
                    }
                }
            }
            .xj-menu__submenu {
                float: left;
                position: relative;
                &::after {
                    content: '';
                    position: absolute;
                    display: inline-block;
                    width: 100%;
                    height: 2px;
                    left: 0;
                    bottom: 0;
                    background-color: #D1AA76;
                    transform: scaleX(0);
                    transition: all .15s;
                }
                .xj-menu__submenu-title {
                }
                .xj-menu__item {
                    display: block;
                    float: none;

                    .xj-menu__item-link {
                        &::after {
                            display: none;
                        }
                    }
                }
                .xj-menu__submenu {
                    display: block;
                    float: none;
                    height: inherit;

                    .xj-menu__submenu-title {

                        i:last-child {
                            position: absolute;
                            right: 0;
                            top: 50%;
                            margin-top: -6px;
                            transform: rotate(-90deg);
                        }
                    }
                    &.xj-menu__submenu--active {
                        &::after {
                            transform: scaleX(0);
                        }
                    }
                }

                &:hover,
                &.xj-menu__submenu--active {
                }
                &--disabled {
                    &:hover,
                    &.xj-menu__submenu--active {
                        .xj-menu__submenu-title {
                            cursor: not-allowed;
                        }
                        &::after {
                            transform: scaleX(0);
                        }
                    }
                }
            }
        }

        /* Vertical */
        &--vertical {
            position: relative;
            .xj-menu__item,
            .xj-menu__submenu {
                position: relative;
                display: block;
            }
            .xj-menu__item-link {

                &::after {
                    content: '';
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 6px;
                    height: 100%;

                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    transition: opacity .2s;
                    opacity: 0;
                }

            }

        }

    }

</style>
