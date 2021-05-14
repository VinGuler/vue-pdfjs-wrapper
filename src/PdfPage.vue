<template>
  <div class="pdf-page-container" :id="getPageContainerID" :ref="getPageContainerID">
    <canvas class="pdf-canvas-layer" :id="getCanvasID" :ref="getCanvasID"></canvas>
    <div class="pdf-text-layer" :id="getTextLayerID" :ref="getTextLayerID"></div>
  </div>
</template>

<script>
  export default {
    name: 'pdfPage',
    props: {
      pageNumber: {
        type: Number,
        required: true
      },
      page: {
        type: Object,
        required: true
      },
      scale: Number,
      pageContainerID: String,
      canvasID: String,
      isRenderText: Boolean,
      textLayerID: String
    },
    data () {
      return {
        viewport: null
      }
    },
    computed: {
      getPageContainerID () {
        const idString = this.pageContainerID || 'pdf-page-container'
        return idString + '-' + this.pageNumber
      },
      getCanvasID() {
        const idString = this.canvasID || 'pdf-canvas-layer-page'
        return idString + '-' + this.pageNumber
      },
      getTextLayerID() {
        const idString = this.textLayerID || 'pdf-text-layer-page'
        return idString + '-' + this.pageNumber
      }
    },
    methods: {
      async loadPage() {
        console.log('loading canvas layer')
        const canvas = this.$refs[this.getCanvasID]
        canvas.height = this.viewport.height
        canvas.width = this.viewport.width
        const context = canvas.getContext('2d')
        const renderContext = {
          canvasContext: context,
          viewport: this.viewport
        }
        await this.page.render(renderContext)
      },
      async loadTextLayer() {
        console.log('loading text layer')
        const div = this.$refs[this.getTextLayerID]
        const textContent = await this.page.getTextContent()
        const textLayer = this.$PDFJS.renderTextLayer({
          container: div,
          textContent,
          viewport: this.viewport
        })
        textLayer._render()
      }
    },
    created () {
      this.viewport = this.page.getViewport({ scale: this.scale })
    },
    async mounted() {
      await this.loadPage()
      if (this.isRenderText) {
        await this.loadTextLayer()
      }
    }
  }
</script>
