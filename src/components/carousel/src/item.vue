<template>
    <div
            v-show="ready"
            class="xj-carousel__item"
            :class="{
      'is-active': active,
      'xj-carousel__item--card': $parent.type === 'card',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
            @click="handleItemClick"
            :style="itemStyle">
        <div
                v-if="$parent.type === 'card'"
                v-show="!active"
                class="xj-carousel__mask">
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import { autoprefixer } from '../../../utils/util';
    const CARD_SCALE = 0.83;
    export default {
        name: 'ElCarouselItem',

        props: {
            name: String,
            label: {
                type: [String, Number],
                default: ''
            }
        },

        data() {
            return {
                hover: false,
                translate: 0,
                scale: 1,
                active: false,
                ready: false,
                inStage: false,
                animating: false
            };
        },

        methods: {
            processIndex(index, activeIndex, length) {
                if (activeIndex === 0 && index === length - 1) {
                    return -1;
                } else if (activeIndex === length - 1 && index === 0) {
                    return length;
                } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
                    return length + 1;
                } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
                    return -2;
                }
                return index;
            },

            calcCardTranslate(index, activeIndex) {
                const parentWidth = this.$parent.$el.offsetWidth;
                if (this.inStage) {
                    return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
                } else if (index < activeIndex) {
                    return -(1 + CARD_SCALE) * parentWidth / 4;
                } else {
                    return (3 + CARD_SCALE) * parentWidth / 4;
                }
            },

            calcTranslate(index, activeIndex, isVertical) {
                const distance = this.$parent.$el[isVertical ? 'offsetHeight' : 'offsetWidth'];
                return distance * (index - activeIndex);
            },

            translateItem(index, activeIndex, oldIndex) {
                const parentType = this.$parent.type;
                const parentDirection = this.parentDirection;
                const length = this.$parent.items.length;
                if (parentType !== 'card' && oldIndex !== undefined) {
                    this.animating = index === activeIndex || index === oldIndex;
                }
                if (index !== activeIndex && length > 2 && this.$parent.loop) {
                    index = this.processIndex(index, activeIndex, length);
                }
                if (parentType === 'card') {
                    if (parentDirection === 'vertical') {
                        console.warn('[Element Warn][Carousel]vertical directionis not supported in card mode');
                    }
                    this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
                    this.active = index === activeIndex;
                    this.translate = this.calcCardTranslate(index, activeIndex);
                    this.scale = this.active ? 1 : CARD_SCALE;
                } else {
                    this.active = index === activeIndex;
                    const isVertical = parentDirection === 'vertical';
                    this.translate = this.calcTranslate(index, activeIndex, isVertical);
                }
                this.ready = true;
            },

            handleItemClick() {
                const parent = this.$parent;
                if (parent && parent.type === 'card') {
                    const index = parent.items.indexOf(this);
                    parent.setActiveItem(index);
                }
            }
        },

        computed: {
            parentDirection() {
                return this.$parent.direction;
            },

            itemStyle() {
                const translateType = this.parentDirection === 'vertical' ? 'translateY' : 'translateX';
                const value = `${translateType}(${ this.translate }px) scale(${ this.scale })`;
                const style = {
                    transform: value
                };
                return autoprefixer(style);
            }
        },

        created() {
            this.$parent && this.$parent.updateItems();
        },

        destroyed() {
            this.$parent && this.$parent.updateItems();
        }
    };
</script>
<style>

    .xj-carousel__item,.xj-carousel__mask {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0
    }

    .xj-carousel__item {
        width: 100%;
        display: inline-block;
        overflow: hidden;
        z-index: 0
    }

    .xj-carousel__item.is-active {
        z-index: 2
    }

    .xj-carousel__item.is-animating {
        -webkit-transition: -webkit-transform .4s ease-in-out;
        transition: -webkit-transform .4s ease-in-out;
        transition: transform .4s ease-in-out;
        transition: transform .4s ease-in-out,-webkit-transform .4s ease-in-out
    }

    .xj-carousel__item--card {
        width: 50%;
        -webkit-transition: -webkit-transform .4s ease-in-out;
        transition: -webkit-transform .4s ease-in-out;
        transition: transform .4s ease-in-out;
        transition: transform .4s ease-in-out,-webkit-transform .4s ease-in-out
    }

    .xj-carousel__item--card.is-in-stage {
        cursor: pointer;
        z-index: 1
    }

    .xj-carousel__item--card.is-in-stage.is-hover .xj-carousel__mask,.xj-carousel__item--card.is-in-stage:hover .xj-carousel__mask {
        opacity: .12
    }

    .xj-carousel__item--card.is-active {
        z-index: 2
    }

    .xj-carousel__mask {
        width: 100%;
        background-color: #fff;
        opacity: .24;
        -webkit-transition: .2s;
        transition: .2s
    }

</style>