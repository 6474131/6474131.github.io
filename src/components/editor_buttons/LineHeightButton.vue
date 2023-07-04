<template>
    <div v-tooltip class="btn-group" role="group" title="Line Height">
        <button
                aria-expanded="false"
                class="btn btn-outline-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button"> {{ shownLineHeight }}
        </button>
        <ul class="dropdown-menu" style="min-width: 25px; max-height: 500px; overflow-y: auto; overflow-x: clip">
            <li><a
                    v-for="value in lineHeightArray"
                    v-tooltip
                    class="dropdown-item"
                    href="#"
                    @click="this.lineHeight = value; changeLineHeight()">{{ value }}</a>
            </li>
        </ul>
    </div>

</template>

<script>
import { validateFormat } from "@/js/global";

export default {
  name:  "LineHeightButton",
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
      lineHeight: 1.5,
    };
  },
  computed: {
    lineHeightArray() {
      const lineHeightArray = [];

      for (let i = 1; i <= 40; i++) {
        lineHeightArray.push(i / 4);
      }
      return lineHeightArray;
    },
    shownLineHeight() {
      if (this.lineHeight) {
        return "" + this.lineHeight;
      }
      return "";
    },
  },
  watch:    {
    editorReady() {
      this.quill.on('editor-change', () => {
        const range     = this.quill.getSelection();
        let default_val = '1.5';
        if (range) {
          default_val = this.quill.getFormat(range.index, range.length)['lineheight'] ?? default_val;
        }
        this.lineHeight = parseFloat(validateFormat(default_val) ?? default_val);
      });
    },
  },
  methods:  {
    changeLineHeight() {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.formatLine(range.index, range.length, 'lineheight', this.lineHeight);
      }
    },
  },
};
</script>

<style scoped>

</style>