### vue-pdfjs-wrapper

A simple Vue.js wrapper component for PDF.js.

# Note

This component installs and uses `pdfjs-dist`, and loads its worker using the `worker-loader` webpack module.

# Install

`npm install --save vue-pdfjs-wrapper`

Import it into a specific component:<br />

```javascript
import VuePdfjsWrapper from 'vue-pdfjs-wrapper'
export default {
  components: { VuePdfjsWrapper },
  ...
}
```

You can also use it globally using the `{plugin}` export:

```javascript
import Vue from 'vue'
import { plugin } from 'vue-pdfjs-wrapper'
Vue.use(plugin)
```

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
  import VuePdfjsWrapper from 'vue-pdfjs-wrapper'

  export default {
    components: { VuePdfjsWrapper },
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
