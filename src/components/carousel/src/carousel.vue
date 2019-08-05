<template>
    <div
            :class="carouselClasses"
            @mouseenter.stop="handleMouseEnter"
            @mouseleave.stop="handleMouseLeave">
        <div
                class="xj-carousel__container"
                :style="{ height: height }">
            <transition
                    v-if="arrowDisplay"
                    name="carousel-arrow-left">
                <div
                        type="button"
                        v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
                        @mouseenter="handleButtonEnter('left')"
                        @mouseleave="handleButtonLeave"
                        @click.stop="throttledArrowClick(activeIndex - 1)"
                        class="xj-carousel__arrow xj-carousel__arrow--left">
                    <slot name="left">
                            左边
                    </slot>

                </div>
            </transition>
            <transition
                    v-if="arrowDisplay"
                    name="carousel-arrow-right">
                <div
                        type="button"
                        v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
                        @mouseenter="handleButtonEnter('right')"
                        @mouseleave="handleButtonLeave"
                        @click.stop="throttledArrowClick(activeIndex + 1)"
                        class="xj-carousel__arrow xj-carousel__arrow--right">
                    <slot name="right">
                            右边
                    </slot>

                </div>
            </transition>
            <slot></slot>
        </div>
        <ul
                v-if="indicatorPosition !== 'none'"
                :class="indicatorsClasses">
            <li
                    v-for="(item, index) in items"
                    :key="index"
                    :class="[
          'xj-carousel__indicator',
          'xj-carousel__indicator--' + direction,
          { 'is-active': index === activeIndex }]"
                    @mouseenter="throttledIndicatorHover(index)"
                    @click.stop="handleIndicatorClick(index)">
                <div class="xj-carousel__button">
                    <span v-if="hasLabel">{{ item.label }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {throttle} from 'throttle-debounce';
    import { addResizeListener, removeResizeListener } from '../../../utils/resize-event';

    export default {
        name: 'Carousel',

        props: {
            initialIndex: {
                type: Number,
                default: 0
            },
            height: String,
            trigger: {
                type: String,
                default: 'hover'
            },
            autoplay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 3000
            },
            indicatorPosition: String,
            indicator: {
                type: Boolean,
                default: true
            },
            arrow: {
                type: String,
                default: 'hover'
            },
            type: String,
            loop: {
                type: Boolean,
                default: true
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(val) {
                    return ['horizontal', 'vertical'].indexOf(val) !== -1;
                }
            }
        },

        data() {
            return {
                items: [],
                activeIndex: -1,
                containerWidth: 0,
                timer: null,
                hover: false
            };
        },

        computed: {
            arrowDisplay() {
                return this.arrow !== 'never' && this.direction !== 'vertical';
            },

            hasLabel() {
                return this.items.some(item => item.label.toString().length > 0);
            },

            carouselClasses() {
                const classes = ['xj-carousel', 'xj-carousel--' + this.direction];
                if (this.type === 'card') {
                    classes.push('xj-carousel--card');
                }
                return classes;
            },

            indicatorsClasses() {
                const classes = ['xj-carousel__indicators', 'xj-carousel__indicators--' + this.direction];
                if (this.hasLabel) {
                    classes.push('xj-carousel__indicators--labels');
                }
                if (this.indicatorPosition === 'outside' || this.type === 'card') {
                    classes.push('xj-carousel__indicators--outside');
                }
                return classes;
            }
        },

        watch: {
            items(val) {
                if (val.length > 0) this.setActiveItem(this.initialIndex);
            },

            activeIndex(val, oldVal) {
                this.resetItemPosition(oldVal);
                if (oldVal > -1) {
                    this.$emit('change', val, oldVal);
                }
            },

            autoplay(val) {
                val ? this.startTimer() : this.pauseTimer();
            },

            loop() {
                this.setActiveItem(this.activeIndex);
            }
        },

        methods: {
            handleMouseEnter() {
                this.hover = true;
                this.pauseTimer();
            },

            handleMouseLeave() {
                this.hover = false;
                this.startTimer();
            },

            itemInStage(item, index) {
                const length = this.items.length;
                if (index === length - 1 && item.inStage && this.items[0].active ||
                    (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
                    return 'left';
                } else if (index === 0 && item.inStage && this.items[length - 1].active ||
                    (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
                    return 'right';
                }
                return false;
            },

            handleButtonEnter(arrow) {
                if (this.direction === 'vertical') return;
                this.items.forEach((item, index) => {
                    if (arrow === this.itemInStage(item, index)) {
                        item.hover = true;
                    }
                });
            },

            handleButtonLeave() {
                if (this.direction === 'vertical') return;
                this.items.forEach(item => {
                    item.hover = false;
                });
            },

            updateItems() {
                this.items = this.$children.filter(child => child.$options.name === 'CarouselItem');
            },

            resetItemPosition(oldIndex) {
                this.items.forEach((item, index) => {
                    item.translateItem(index, this.activeIndex, oldIndex);
                });
            },

            playSlides() {
                if (this.activeIndex < this.items.length - 1) {
                    this.activeIndex++;
                } else if (this.loop) {
                    this.activeIndex = 0;
                }
            },

            pauseTimer() {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            },

            startTimer() {
                if (this.interval <= 0 || !this.autoplay || this.timer) return;
                this.timer = setInterval(this.playSlides, this.interval);
            },

            setActiveItem(index) {
                if (typeof index === 'string') {
                    const filteredItems = this.items.filter(item => item.name === index);
                    if (filteredItems.length > 0) {
                        index = this.items.indexOf(filteredItems[0]);
                    }
                }
                index = Number(index);
                if (isNaN(index) || index !== Math.floor(index)) {
                    console.warn('[Element Warn][Carousel]index must be an integer.');
                    return;
                }
                let length = this.items.length;
                const oldIndex = this.activeIndex;
                if (index < 0) {
                    this.activeIndex = this.loop ? length - 1 : 0;
                } else if (index >= length) {
                    this.activeIndex = this.loop ? 0 : length - 1;
                } else {
                    this.activeIndex = index;
                }
                if (oldIndex === this.activeIndex) {
                    this.resetItemPosition(oldIndex);
                }
            },

            prev() {
                this.setActiveItem(this.activeIndex - 1);
            },

            next() {
                this.setActiveItem(this.activeIndex + 1);
            },

            handleIndicatorClick(index) {
                this.activeIndex = index;
            },

            handleIndicatorHover(index) {
                if (this.trigger === 'hover' && index !== this.activeIndex) {
                    this.activeIndex = index;
                }
            }
        },

        created() {
            this.throttledArrowClick = throttle(300, true, index => {
                this.setActiveItem(index);
            });
            this.throttledIndicatorHover = throttle(300, index => {
                this.handleIndicatorHover(index);
            });
        },

        mounted() {
            this.updateItems();
            this.$nextTick(() => {
                addResizeListener(this.$el, this.resetItemPosition);
                if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
                    this.activeIndex = this.initialIndex;
                }
                this.startTimer();
            });
        },

        beforeDestroy() {
            if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
            this.pauseTimer();
        }
    };
</script>

<style lang="scss">
    .xj-carousel {
        position: relative;
        height: 100%;
    }

    .xj-carousel--horizontal {
        overflow-x: hidden;
    }

    .xj-carousel--vertical {
        overflow-y: hidden;
    }

    .xj-carousel__container {
        position: relative;
    }

    .xj-carousel__arrow {
        position: absolute;
        top: 50%;
        z-index: 3;
        margin: 0;
        padding: 0;
        outline: 0;
        border: none;
        text-align: center;
        cursor: pointer;
        transition: .3s;
        transform: translateY(-50%);
    }

    .xj-carousel__arrow--left {
        left: 16px;
    }

    .xj-carousel__arrow--right {
        right: 16px;
    }


    .xj-carousel__arrow i {
        cursor: pointer;
    }

    .xj-carousel__indicators {
        position: absolute;
        z-index: 2;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .xj-carousel__indicators--horizontal {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .xj-carousel__indicators--vertical {
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    .xj-carousel__indicators--outside {
        position: static;
        bottom: 26px;
        text-align: center;
        -webkit-transform: none;
        transform: none;
    }


    .xj-carousel__indicators--labels {
        right: 0;
        left: 0;
        text-align: center;
        -webkit-transform: none;
        transform: none;
    }

    .xj-carousel__indicators--labels .xj-carousel__button {
        width: auto;
        height: auto;

    }

    .xj-carousel__indicator {
        background-color: transparent;
        cursor: pointer;
    }

    .xj-carousel__indicator--horizontal {
        display: inline-block;
    }


    .carousel-arrow-left-enter,.carousel-arrow-left-leave-active {
        opacity: 0;
        transform: translateY(-50%) translateX(-10px);
    }

    .carousel-arrow-right-enter,.carousel-arrow-right-leave-active {
        opacity: 0;
        transform: translateY(-50%) translateX(10px);
    }
</style>
