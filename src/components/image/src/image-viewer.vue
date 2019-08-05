<template>
    <transition name="viewer-fade">
        <div class="xj-image-viewer__wrapper" :style="{ 'z-index': zIndex }">
            <div class="xj-image-viewer__mask"></div>
            <!-- CLOSE -->
            <span class="xj-image-viewer__btn xj-image-viewer__close" @click="hide">
        <i class="xjicon iconshanchu"></i>
      </span>
            <!-- ARROW -->
            <template v-if="!isSingle">
        <span
                class="xj-image-viewer__btn xj-image-viewer__prev"
                :class="{ 'is-disabled': !infinite && isFirst }"
                @click="prev">
          <i class="xjicon iconxiangzuo1"/>
        </span>
                <span
                        class="xj-image-viewer__btn xj-image-viewer__next"
                        :class="{ 'is-disabled': !infinite && isLast }"
                        @click="next">
          <i class="xjicon iconxiangyou1"/>
        </span>
            </template>
            <!-- ACTIONS -->
            <div class="xj-image-viewer__btn xj-image-viewer__actions">
                <div class="xj-image-viewer__actions__inner">
                    <i class="xjicon iconsuoxiao" @click="handleActions('zoomOut')"></i>
                    <i class="xjicon iconfangda1" @click="handleActions('zoomIn')"></i>
                    <i class="xj-image-viewer__actions__divider"></i>
                    <i class="xjicon iconziyuan" :class="mode.icon" @click="toggleMode"></i>
                    <i class="xj-image-viewer__actions__divider"></i>
                    <i class="xjicon iconxiangzuoxuanzhuan" @click="handleActions('anticlocelise')"></i>
                    <i class="xjicon iconxiangyouxuanzhuan" @click="handleActions('clocelise')"></i>
                </div>
            </div>
            <!-- CANVAS -->
            <div class="xj-image-viewer__canvas">
                <div v-for="(url, i) in urlList">
                    <img

                            v-if="i === index"
                            ref="img"
                            class="xj-image-viewer__img"
                            :key="url"
                            :src="currentImg"
                            :style="imgStyle"
                            @load="handleImgLoad"
                            @error="handleImgError"
                            @mousedown="handleMouseDown"/>
                    <div class="xj-image-viewer-info" v-if="i === index">
                         {{i}}
                    </div>
                </div>


            </div>
        </div>
    </transition>
</template>

<script>
    import { on, off } from '../../../utils/dom';
    import { rafThrottle, isFirefox } from '../../../utils/util';

    const Mode = {
        CONTAIN: {
            name: 'contain',
            icon: 'xj-icon-full-screen'
        },
        ORIGINAL: {
            name: 'original',
            icon: 'xj-icon-c-scale-to-original'
        }
    };

    const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';

    export default {
        name: 'XjImageViewer',

        props: {
            urlList: {
                type: Array,
                default: () => []
            },
            zIndex: {
                type: Number,
                default: 2000
            },
            onSwitch: {
                type: Function,
                default: () => {}
            },
            onClose: {
                type: Function,
                default: () => {}
            }
        },

        data() {
            return {
                index: 0,
                isShow: false,
                infinite: true,
                loading: false,
                mode: Mode.CONTAIN,
                transform: {
                    scale: 1,
                    deg: 0,
                    offsetX: 0,
                    offsetY: 0,
                    enableTransition: false
                }
            };
        },
        computed: {
            isSingle() {
                return this.urlList.length <= 1;
            },
            isFirst() {
                return this.index === 0;
            },
            isLast() {
                return this.index === this.urlList.length - 1;
            },
            currentImg() {
                return this.urlList[this.index];
            },
            imgStyle() {
                const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
                const style = {
                    transform: `scale(${scale}) rotate(${deg}deg)`,
                    transition: enableTransition ? 'transform .3s' : '',
                    'margin-left': `${offsetX}px`,
                    'margin-top': `${offsetY}px`
                };
                if (this.mode === Mode.CONTAIN) {
                    style.maxWidth = style.maxHeight = '100%';
                }
                return style;
            }
        },
        watch: {
            index: {
                handler: function(val) {
                    this.reset();
                    this.onSwitch(val);
                }
            },
            currentImg(val) {
                this.$nextTick(_ => {
                    const $img = this.$refs.img[0];
                    if (!$img.complete) {
                        this.loading = true;
                    }
                });
            }
        },
        methods: {
            hide() {
                this.deviceSupportUninstall();
                this.onClose();
            },
            deviceSupportInstall() {
                this._keyDownHandler = rafThrottle(e => {
                    const keyCode = e.keyCode;
                    switch (keyCode) {
                        // ESC
                        case 27:
                            this.hide();
                            break;
                        // SPACE
                        case 32:
                            this.toggleMode();
                            break;
                        // LEFT_ARROW
                        case 37:
                            this.prev();
                            break;
                        // UP_ARROW
                        case 38:
                            this.handleActions('zoomIn');
                            break;
                        // RIGHT_ARROW
                        case 39:
                            this.next();
                            break;
                        // DOWN_ARROW
                        case 40:
                            this.handleActions('zoomOut');
                            break;
                    }
                });
                this._mouseWheelHandler = rafThrottle(e => {
                    const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
                    if (delta > 0) {
                        this.handleActions('zoomIn', {
                            zoomRate: 0.015,
                            enableTransition: false
                        });
                    } else {
                        this.handleActions('zoomOut', {
                            zoomRate: 0.015,
                            enableTransition: false
                        });
                    }
                });
                on(document, 'keydown', this._keyDownHandler);
                on(document, mousewheelEventName, this._mouseWheelHandler);
            },
            deviceSupportUninstall() {
                off(document, 'keydown', this._keyDownHandler);
                off(document, mousewheelEventName, this._mouseWheelHandler);
                this._keyDownHandler = null;
                this._mouseWheelHandler = null;
            },
            handleImgLoad(e) {
                this.loading = false;
            },
            handleImgError(e) {
                this.loading = false;
                e.target.alt = '加载失败';
            },
            handleMouseDown(e) {
                if (this.loading || e.button !== 0) return;

                const { offsetX, offsetY } = this.transform;
                const startX = e.pageX;
                const startY = e.pageY;
                this._dragHandler = rafThrottle(ev => {
                    this.transform.offsetX = offsetX + ev.pageX - startX;
                    this.transform.offsetY = offsetY + ev.pageY - startY;
                });
                on(document, 'mousemove', this._dragHandler);
                on(document, 'mouseup', ev => {
                    off(document, 'mousemove', this._dragHandler);
                });

                e.preventDefault();
            },
            reset() {
                this.transform = {
                    scale: 1,
                    deg: 0,
                    offsetX: 0,
                    offsetY: 0,
                    enableTransition: false
                };
            },
            toggleMode() {
                if (this.loading) return;

                const modeNames = Object.keys(Mode);
                const modeValues = Object.values(Mode);
                const index = modeValues.indexOf(this.mode);
                const nextIndex = (index + 1) % modeNames.length;
                this.mode = Mode[modeNames[nextIndex]];
                this.reset();
            },
            prev() {
                if (this.isFirst && !this.infinite) return;
                const len = this.urlList.length;
                this.index = (this.index - 1 + len) % len;
            },
            next() {
                if (this.isLast && !this.infinite) return;
                const len = this.urlList.length;
                this.index = (this.index + 1) % len;
            },
            handleActions(action, options = {}) {
                if (this.loading) return;
                const { zoomRate, rotateDeg, enableTransition } = {
                    zoomRate: 0.2,
                    rotateDeg: 90,
                    enableTransition: true,
                    ...options
                };
                const { transform } = this;
                switch (action) {
                    case 'zoomOut':
                        if (transform.scale > 0.2) {
                            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
                        }
                        break;
                    case 'zoomIn':
                        transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
                        break;
                    case 'clocelise':
                        transform.deg += rotateDeg;
                        break;
                    case 'anticlocelise':
                        transform.deg -= rotateDeg;
                        break;
                }
                transform.enableTransition = enableTransition;
            }
        },
        mounted() {
            this.deviceSupportInstall();
        }
    };
</script>
<style>
    .xj-image-viewer__canvas{
        position: relative;
    }
    .xj-image-viewer-info{
        position: absolute;
        bottom: 0;
        background:rgba(0,0,0,0.6);;
        width: 100%;
        text-align: center;
        color: #D1AA76;
        height: 40px;
        line-height: 40px;
        left: 0;
    }
</style>