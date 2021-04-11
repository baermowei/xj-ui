<template>
    <div class="xj-image">
        <slot v-if="loading" name="placeholder">
            <div class="xj-image__placeholder"></div>
        </slot>
        <img
                v-else-if="error"
                class="xj-image__inner"
                :src="errImgUrl"
                :style="imageStyle"
                :class="{ 'xj-image__inner--center': alignCenter}">
        <!-- <slot v-else-if="error" name="error">
            <div class="xj-image__error">加载失败</div>
        </slot> -->
        <img
                v-else
                class="xj-image__inner"
                v-bind="$attrs"
                v-on="$listeners"
                @click="clickHandler"
                :src="styles?(src+'?x-oss-process=style/'+styles):src"
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
        name: 'XjImage',

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
            },
            errImgUrl:{
                type:String,
                default:''
            },
            styles:{
                type:String,
                default:''
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
            src() {
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
                if(this.previewSrcList&&this.previewSrcList.length){
                    this.showViewer = true;
                    document.body.style.overflowY='hidden';
                }
            },
            closeViewer() {
                this.showViewer = false;
                 document.body.style.overflowY='auto';
            }
        }
    };
</script>



<style lang="scss">


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
        transform: translate(-50%,-50%);
        display: block
    }

    .xj-image__error {

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
        cursor: pointer;

    }

    .xj-image-viewer__close {
        top: 40px;
        right: 40px;
        .xjicon{
            font-size: 26px;
        }
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
        bottom: 50px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 282px;
        height: 44px;
        padding: 0 23px;
        background-color: rgba(0, 0, 0, 0.6);
        border-color: #fff;
        border-radius: 22px
    }

    .xj-image-viewer__actions__inner {
        width: 100%;
        height: 100%;
        text-align: justify;
        cursor: default;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        .xjicon{
            cursor: pointer;
            opacity: 0.6;
            &:hover{
                opacity: 1;
            }
        }
    }

    .xj-image-viewer__prev,.xj-image-viewer__next{
        top: 50%;
        width:34px;
        height:121px;
        background:rgba(0,0,0,0.6);
        line-height: 121px;
        text-align: center;
        margin-top: -62px;
        color: #fff;
        &:hover{
            opacity: 0.9;
            .xjicon{
                color: #D1AA76;
            }
        }
        .xjicon{
            font-size: 22px;
        }
    }

    .xj-image-viewer__next{
        right: 0;
    }


    .xj-image-viewer__prev {
        left: 0;
        border-radius:0px 16px 16px 0px;
    }

    .xj-image-viewer__next {
        border-radius:16px 0px 0px 16px;
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
        animation: viewer-fade-in .3s
    }

    .viewer-fade-leave-active {
        animation: viewer-fade-out .3s
    }

    @-webkit-keyframes viewer-fade-in {
        0% {
            transform: translate3d(0,-20px,0);
            opacity: 0
        }

        100% {
            transform: translate3d(0,0,0);
            opacity: 1
        }
    }

    @keyframes viewer-fade-in {
        0% {
            transform: translate3d(0,-20px,0);
            opacity: 0
        }

        100% {
            transform: translate3d(0,0,0);
            opacity: 1
        }
    }

    @-webkit-keyframes viewer-fade-out {
        0% {
            transform: translate3d(0,0,0);
            opacity: 1
        }

        100% {
            transform: translate3d(0,-20px,0);
            opacity: 0
        }
    }

    @keyframes viewer-fade-out {
        0% {
            transform: translate3d(0,0,0);
            opacity: 1
        }

        100% {
            transform: translate3d(0,-20px,0);
            opacity: 0
        }
    }

</style>