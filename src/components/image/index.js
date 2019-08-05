import Image from './src/image';

/* istanbul ignore next */
Image.install = function(Vue) {
    Vue.component('Xj'+Image.name, Image);
};

export default Image;