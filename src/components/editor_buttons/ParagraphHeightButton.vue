<template>
  <div v-tooltip class="btn-group" role="group" title="Paragraph Height">
    <button
        aria-expanded="false"
        class="btn btn-outline-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        type="button"> {{ shownLineHeight }}
    </button>
    <ul class="dropdown-menu" style="min-width: 25px; max-height: 500px; overflow-y: auto; overflow-x: clip">
      <li><a
          v-for="value in paragraphHeightArray"
          v-tooltip
          class="dropdown-item"
          href="#"
          @click="this.paragraphHeight = value; changeParagraphHeight()">{{ value }}</a>
      </li>
    </ul>
  </div>

</template>

<script>
import { validateFormat } from "@/js/global";

export default {
  name:  "ParagraphHeightButton",
  props: {
    quill:       {
      default:  null,
      required: true,
    },
    editorReady: {
      default:  false,
      required: true,
    },
  },
  data() {
    return {
      paragraphHeight: null,
    };
  },
  computed: {
    paragraphHeightArray() {
      const lineHeightArray = [];

      for (let i = 0; i <= 200; i += 1) {
        lineHeightArray.push(i);
      }
      return lineHeightArray;
    },
    shownLineHeight() {
      if (this.paragraphHeight) {
        return "" + this.paragraphHeight;
      }
      return "";
    },
  },
  watch:    {
    editorReady() {
      this.quill.on('editor-change', () => {
        const range = this.quill.getSelection();
        if (range) {
          const lineHeight     = this.quill.getFormat(range.index, range.length)['paragraphheight'];
          this.paragraphHeight = parseInt(validateFormat(lineHeight));
        }
        else {
          this.paragraphHeight = null;
        }
      });
    },
  },
  methods:  {
    changeParagraphHeight() {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.formatLine(range.index, range.length, 'paragraphheight', this.paragraphHeight + "px");
      }
    },
  },
};
</script>

<style scoped>

</style>