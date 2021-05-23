import VuePdfjsWrapper from './src/VuePdfjsWrapper.vue'
export const plugin = {
  install: (Vue) => {
    Vue.component('vue-pdfjs-wrapper', VuePdfjsWrapper)
  }
}
export default VuePdfjsWrapper
