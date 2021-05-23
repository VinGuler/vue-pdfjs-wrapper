<template>
  <div class="pdf-pages-container" ref="pdf-pages-container">
    <pdf-page
      v-for="page in pages"
      :key="'pdf-canvas-layer-' + page.pageNum"
      :page-number="page.pageNum"
      :page="page"
      :scale="scale"
      :is-render-text="isRenderText"
    />
  </div>
</template>

<script>
  // Loading the worker using webpack 'worker-lodaer' module 
  import workerLoader from 'worker-loader!pdfjs-dist/es5/build/pdf.worker.js'
  const worker = workerLoader()
  // Using pdfjs node_module
  const pdfjsLib = require('pdfjs-dist/es5/build/pdf.js')
  pdfjsLib.GlobalWorkerOptions.workerPort = worker

  // Container for each pdf page
  import pdfPage from './PdfPage.vue'

  export default {
    name: 'VuePdfjsWrapper',
    components: { pdfPage },
    props: {
      pdfSrc: null,
      scale: { type: Number, default: 1 },
      isRenderText: Boolean
    },
    data() {
      return {
        pages: []
      }
    },
    methods: {
      async loadDocument() {
        if (!this.pdfSrc) {
          console.warn('Please give me a PDF file source to feed pdfjsLib.getDocument()')
          return
        }
        this.pages = []
        const doc = await pdfjsLib.getDocument(this.pdfSrc).promise
        const pagesAmount = doc.numPages
        for (let pageNumber = 1; pageNumber <= pagesAmount; pageNumber++) {
          const page = await doc.getPage(pageNumber)
          page.pageNum = pageNumber
          this.pages.push(page)
        }
        this.$emit('loaded')
      }
    },
    watch: {
      async pdfSrc(value) {
        if (value) {
          await this.loadDocument()
        }
      },
      async scale() {
        await this.loadDocument()
      },
      async isRenderText() {
        await this.loadDocument()
      }
    },
    async created() {
      if (this.pdfSrc) {
        await this.loadDocument()
      }
    }
  }
</script>

<style>
  .pdf-pages-container {
    position: relative;
    width: fit-content;
  }
  .pdf-page-container {
    position: relative;
    width: fit-content;
  }
  .pdf-text-layer {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    opacity: 0.2;
    line-height: 1;
  }
  .pdf-text-layer > span {
    color: transparent;
    position: absolute;
    white-space: pre;
    cursor: text;
    transform-origin: 0% 0%;
  }
</style>
