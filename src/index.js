import VuePdfjsWrapper from './VuePdfjsWrapper.vue'


// Declare install function executed by Vue.use()
export function install(Vue, options = {}) {
  if (this.installed) return
  this.installed = true

  // Installing pdfjsLib and setting its workerSrc to pdf.js CDN
  const workerSrc = options.workerSrc || `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc
  Object.defineProperty(Vue.prototype, '$PDFJS', { value: pdfjsLib })

  Vue.component('vue-pdfjs-wrapper', VuePdfjsWrapper)
}

// Create module definition for Vue.use()
const plugin = { install }
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

export default VuePdfjsWrapper
