import Image from './src/image';

/* istanbul ignore next */
Image.install = function(Vue) {
    Vue.component(Image.name, Image);
};

export default Image;