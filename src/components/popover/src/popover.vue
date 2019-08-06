<template>
    <div class="xj-popover" v-clickoutside="handleClose" ref="parent">
    <span class="xj-popover__trigger" ref="trigger">
      <slot></slot>
    </span>

        <transition :name="transition" @after-leave="doDestory">
            <div
                    class="xj-popover__popper"
                    :class="[
          placement ? 'xj-popover--' + placement : 'xj-popover--top'
        ]"
                    v-if="show"
                    ref="popover">
                <div class="xj-popover__arrow"></div>
                <div class="xj-popover__title" v-if="title">
                    <slot name="title"><div v-html="title"></div></slot>
                </div>
                <div class="xj-popover__content">
                    <slot name="content"><div v-html="content"></div></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Clickoutside from '../../../directives/clickoutside'
    import PopoverMixin from '../../../mixins/popover'

    export default {
        name: 'Popover',
        mixins: [PopoverMixin],
        directives: { Clickoutside },
        props: {
            trigger: {
                type: String,
                default: 'hover'
            },
            transition: {
                type: String,
                default: 'fade'
            }
        },
        watch: {
            value (value) {
                this.show = value
            }
        },
        methods: {
            handleClose () {
                this.show = false
            }
        }
    }
</script>
<style lang="scss">

    .xj-popover {
        display: inline-block;

    /* element */
    &__trigger {
         display: inline-block;
         position: relative;
     }
    &__popper {
         position: absolute;
     }
    &__title {
         margin: 0;
         word-wrap: break-word;

     }
    &__content {
         line-height: 1.5;
         word-wrap: break-word;

     }
    &__arrow,
    &__arrow::after {
         content: '';
         position: absolute;
         display: block;
         width: 0;
         height: 0;
         border: red solid transparent;
     }

    /* modifier */
    /**
     * Top
     */
    &--top,
    &--top-left,
    &--top-right {
         margin-top: -12px;

    .xj-popover__arrow {
        bottom: 0;
        left: 50%;
        border-bottom-width: 0;


    &::after {
         bottom: 1px;

         border-bottom-width: 0;

     }
    }
    }
    &--top-left {
    .xj-popover__arrow {

    }
    }
    &--top-right {
    .xj-popover__arrow {
        left: initial;

    }
    }

    /**
     * Bottom
     */
    &--bottom,
    &--bottom-left,
    &--bottom-right {
         margin-top: 12px;

    .xj-popover__arrow {
        top: 0;
        left: 50%;

        border-top-width: 0;


    &::after {
         top: 1px;

         border-top-width: 0;

     }
    }
    }
    &--bottom-left {
    .xj-popover__arrow {

    }
    }
    &--bottom-right {
    .xj-popover__arrow {
        left: initial;

    }
    }

    /**
     * Left
     */
    &--left,
    &--left-top,
    &--left-bottom {
         margin-left: -12px;

    .xj-popover__arrow {
        top: 50%;
        right: 0;

        border-right-width: 0;


    &::after {
         right: 1px;

         border-right-width: 0;

     }
    }
    }
    &--left-top {
    .xj-popover__arrow {

    }
    }
    &--left-bottom {
    .xj-popover__arrow {
        top: initial;

    }
    }

    /**
     * Right
     */
    &--right,
    &--right-top,
    &--right-bottom {
         margin-left: 12px;

    .xj-popover__arrow {
        top: 50%;
        left: 0;

        border-left-width: 0;


    &::after {
         left: 1px;

         border-left-width: 0;

     }
    }
    }
    &--right-top {
    .xj-popover__arrow {

    }
    }
    &--right-bottom {
    .xj-popover__arrow {
        top: initial;
    }
    }
    }

</style>
