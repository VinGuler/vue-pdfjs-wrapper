import VuePdfjsWrapper from './VuePdfjsWrapper.vue'

function install(Vue, options = {}) {
  if (install.installed) return
  install.installed = true
  
  // Installing pdfjsLib and setting its workerSrc to pdf.js CDN
  const pdfjsLib = require('pdfjs-dist/es5/build/pdf.js')
  const workerSrc = options.workerSrc || `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc
  // Making pdfjsLib available globaly
  Object.defineProperty(Vue.prototype, '$PDFJS', { value: pdfjsLib })

  // Vue.component('vue-pdfjs-wrapper', VuePdfjsWrapper)
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

export { install, VuePdfjsWrapper }
export default plugin
