import Carousel from './src/carousel';

/* istanbul ignore next */
Carousel.install = function(Vue) {
    Vue.component('Xj'+Carousel.name, Carousel);
};

export default Carousel;