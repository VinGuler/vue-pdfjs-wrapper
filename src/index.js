import VuePdfjsWrapper from './VuePdfjsWrapper.vue'

function install(Vue, options = {}) {
  // Installing pdfjsLib and setting its workerSrc to pdf.js CDN
  const pdfjsLib = require('pdfjs-dist/es5/build/pdf.js')
  const workerSrc = options.workerSrc || `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc
  // Making pdfjsLib available globaly
  Object.defineProperty(Vue.prototype, '$PDFJS', { value: pdfjsLib })
}

// Create module definition for Vue.use()
const plugin = {
  install: (Vue, options = {}) => {
    install(Vue, options)
    Vue.component('vue-pdfjs-wrapper', VuePdfjsWrapper)
  }
}
// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export { install, VuePdfjsWrapper }
export default plugin
