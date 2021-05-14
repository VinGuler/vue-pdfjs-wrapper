### vue-pdfjs-wrapper

A simple Vue.js wrapper component for PDF.js.

# Note

Although this component installs `pdfjs-dist`, it is using the worker from pdf.js CDN.<br />
You can pass the worker src path if you want to use something else.<br />
See the <a href="#example">example</a> below.

# Install

`npm install --save vue-pdfjs-wrapper`

# API

## Props

### `pdf-src`

Type: <b>[ String ]</b><br />
<b>Required</b><br />
The source of the PDF file, should be anything `pdfjs.getDocument()` Accepts.

### `scale`

Type: <b>Number</b><br />
Default: `1`<br />
Float number describing the scale of the document to be rendered.<br />
Passed to `getViewport({ scale })`

### `is-render-text`

Type: <b>Boolean</b><br />
Default: `false`<br />
This decides whether the text layer should be rendered

## Emits

### `@loaded`

Emits: <b>void</b><br />
Emitted once the pdf is fully loaded and rendered

# Example

## main.js

```javascript
import Vue from 'vue'
import VuePdfjsWrapper from 'vue-pdfjs-wrapper/src/wrapper'
// If omitted will use the one present on pdf.js CDN
const workerSrc = 'path/to/worker'
Vue.use(VuePdfjsWrapper, { workerSrc })
```

## Component.vue

```javascript
<template>
  <div>
    <vue-pdfjs-wrapper
      :pdf-src="src"
      :scale="getScale"
      :is-render-text="isRenderText"
      @loaded="onDocumentLoaded"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        src: 'http://url/to/file.pdf',
        scale: 1.5,
        isRenderText: true
      }
    },
    methods: {
      onDocumentLoaded () {
        // Do stuff after document loads
      }
    }
  }
</script>
```
