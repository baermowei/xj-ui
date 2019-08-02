<template>
    <div class="xj-image">
        <slot v-if="loading" name="placeholder">
            <div class="xj-image__placeholder"></div>
        </slot>
        <slot v-else-if="error" name="error">
            <div class="xj-image__error">{{ t('el.image.error') }}</div>
        </slot>
        <img
                v-else
                class="xj-image__inner"
                v-bind="$attrs"
                v-on="$listeners"
                @click="clickHandler"
                :src="src"
                :style="imageStyle"
                :class="{ 'xj-image__inner--center': alignCenter, 'xj-image__preview': preview }">
        <image-viewer :z-index="zIndex" v-if="preview && showViewer" :on-close="closeViewer" :url-list="previewSrcList"/>
    </div>
</template>

<script>
    import ImageViewer from './image-viewer';
    import { on, off, getScrollContainer, isInContainer } from '../../../utils/dom';
    import { isString, isHtmlElement } from '../../../utils/types';
    import {throttle} from 'throttle-debounce';

    const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;

    const ObjectFit = {
        NONE: 'none',
        CONTAIN: 'contain',
        COVER: 'cover',
        FILL: 'fill',
        SCALE_DOWN: 'scale-down'
    };

    export default {
        name: 'ElImage',

        inheritAttrs: false,

        components: {
            ImageViewer
        },

        props: {
            src: String,
            fit: String,
            lazy: Boolean,
            scrollContainer: {},
            previewSrcList: {
                type: Array,
                default: () => []
            },
            zIndex: {
                type: Number,
                default: 2000
            }
        },

        data() {
            return {
                loading: true,
                error: false,
                show: !this.lazy,
                imageWidth: 0,
                imageHeight: 0,
                showViewer: false
            };
        },

        computed: {
            imageStyle() {
                const { fit } = this;
                if (!this.$isServer && fit) {
                    return isSupportObjectFit()
                        ? { 'object-fit': fit }
                        : this.getImageStyle(fit);
                }
                return {};
            },
            alignCenter() {
                return !this.$isServer && !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
            },
            preview() {
                const { previewSrcList } = this;
                return Array.isArray(previewSrcList) && previewSrcList.length > 0;
            }
        },

        watch: {
            src(val) {
                this.show && this.loadImage();
            },
            show(val) {
                val && this.loadImage();
            }
        },

        mounted() {
            if (this.lazy) {
                this.addLazyLoadListener();
            } else {
                this.loadImage();
            }
        },

        beforeDestroy() {
            this.lazy && this.removeLazyLoadListener();
        },

        methods: {
            loadImage() {
                if (this.$isServer) return;

                // reset status
                this.loading = true;
                this.error = false;

                const img = new Image();
                img.onload = e => this.handleLoad(e, img);
                img.onerror = this.handleError.bind(this);

                // bind html attrs
                // so it can behave consistently
                Object.keys(this.$attrs)
                    .forEach((key) => {
                        const value = this.$attrs[key];
                        img.setAttribute(key, value);
                    });
                img.src = this.src;
            },
            handleLoad(e, img) {
                this.imageWidth = img.width;
                this.imageHeight = img.height;
                this.loading = false;
            },
            handleError(e) {
                this.loading = false;
                this.error = true;
                this.$emit('error', e);
            },
            handleLazyLoad() {
                if (isInContainer(this.$el, this._scrollContainer)) {
                    this.show = true;
                    this.removeLazyLoadListener();
                }
            },
            addLazyLoadListener() {
                if (this.$isServer) return;

                const { scrollContainer } = this;
                let _scrollContainer = null;

                if (isHtmlElement(scrollContainer)) {
                    _scrollContainer = scrollContainer;
                } else if (isString(scrollContainer)) {
                    _scrollContainer = document.querySelector(scrollContainer);
                } else {
                    _scrollContainer = getScrollContainer(this.$el);
                }

                if (_scrollContainer) {
                    this._scrollContainer = _scrollContainer;
                    this._lazyLoadHandler = throttle(200, this.handleLazyLoad);
                    on(_scrollContainer, 'scroll', this._lazyLoadHandler);
                    this.handleLazyLoad();
                }
            },
            removeLazyLoadListener() {
                const { _scrollContainer, _lazyLoadHandler } = this;

                if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return;

                off(_scrollContainer, 'scroll', _lazyLoadHandler);
                this._scrollContainer = null;
                this._lazyLoadHandler = null;
            },
            /**
             * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
             */
            getImageStyle(fit) {
                const { imageWidth, imageHeight } = this;
                const {
                    clientWidth: containerWidth,
                    clientHeight: containerHeight
                } = this.$el;

                if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};

                const vertical = imageWidth / imageHeight < 1;

                if (fit === ObjectFit.SCALE_DOWN) {
                    const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
                    fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
                }

                switch (fit) {
                    case ObjectFit.NONE:
                        return { width: 'auto', height: 'auto' };
                    case ObjectFit.CONTAIN:
                        return vertical ? { width: 'auto' } : { height: 'auto' };
                    case ObjectFit.COVER:
                        return vertical ? { height: 'auto' } : { width: 'auto' };
                    default:
                        return {};
                }
            },
            clickHandler() {
                this.showViewer = true;
            },
            closeViewer() {
                this.showViewer = false;
            }
        }
    };
</script>



<style>


    .xj-image__error,.xj-image__placeholder {
        background: #f5f7fa
    }

    .xj-image__error,.xj-image__inner,.xj-image__placeholder {
        width: 100%;
        height: 100%
    }

    .xj-image {
        position: relative;
        display: inline-block;
        overflow: hidden
    }

    .xj-image__inner {
        vertical-align: top
    }

    .xj-image__inner--center {
        position: relative;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        display: block
    }

    .xj-image__error {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 14px;
        color: #c0c4cc;
        vertical-align: middle
    }

    .xj-image__preview {
        cursor: pointer
    }

    .xj-image-viewer__wrapper {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0
    }

    .xj-image-viewer__btn {
        position: absolute;
        z-index: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        border-radius: 50%;
        opacity: .8;
        cursor: pointer;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }

    .xj-image-viewer__close {
        top: 40px;
        right: 40px;
        width: 40px;
        height: 40px;
        font-size: 40px
    }

    .xj-image-viewer__canvas {
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center
    }

    .xj-image-viewer__actions {
        left: 50%;
        bottom: 30px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 282px;
        height: 44px;
        padding: 0 23px;
        background-color: #606266;
        border-color: #fff;
        border-radius: 22px
    }

    .xj-image-viewer__actions__inner {
        width: 100%;
        height: 100%;
        text-align: justify;
        cursor: default;
        font-size: 23px;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: distribute;
        justify-content: space-around
    }

    .xj-image-viewer__next,.xj-image-viewer__prev {
        top: 50%;
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff
    }

    .xj-image-viewer__prev {
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 40px
    }

    .xj-image-viewer__next {
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 40px;
        text-indent: 2px
    }

    .xj-image-viewer__mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: .5;
        background: #000
    }

    .viewer-fade-enter-active {
        -webkit-animation: viewer-fade-in .3s;
        animation: viewer-fade-in .3s
    }

    .viewer-fade-leave-active {
        -webkit-animation: viewer-fade-out .3s;
        animation: viewer-fade-out .3s
    }

    @-webkit-keyframes viewer-fade-in {
        0% {
            -webkit-transform: translate3d(0,-20px,0);
            transform: translate3d(0,-20px,0);
            opacity: 0
        }

        100% {
            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0);
            opacity: 1
        }
    }

    @keyframes viewer-fade-in {
        0% {
            -webkit-transform: translate3d(0,-20px,0);
            transform: translate3d(0,-20px,0);
            opacity: 0
        }

        100% {
            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0);
            opacity: 1
        }
    }

    @-webkit-keyframes viewer-fade-out {
        0% {
            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0);
            opacity: 1
        }

        100% {
            -webkit-transform: translate3d(0,-20px,0);
            transform: translate3d(0,-20px,0);
            opacity: 0
        }
    }

    @keyframes viewer-fade-out {
        0% {
            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0);
            opacity: 1
        }

        100% {
            -webkit-transform: translate3d(0,-20px,0);
            transform: translate3d(0,-20px,0);
            opacity: 0
        }
    }

</style>