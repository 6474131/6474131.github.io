<template>
    <div class="btn-group" role="group">
        <input
                v-tooltip :value="this.textColor" class="btn btn-outline-primary" style="height: 100%"
                title="Text Color"
                type="color" @input="changeTextColor">
    </div>
</template>

<script>
import { useCapStyleStore } from "@/stores/cap-style";
import { validateFormat } from "@/js/global";

export default {
  name:  "TextColorButton",
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
      capStyleStore: useCapStyleStore(),
      textColor:     null,
    };
  },
  watch:   {
    editorReady() {
      this.quill.on('editor-change', () => {
        const range = this.quill.getSelection();
        if (range) {
          const textColor = this.quill.getFormat(range.index, range.length)['color'];
          this.textColor  = validateFormat(textColor);
        }
        else {
          this.textColor = null;
        }
      });
    },
  },
  methods: {
    formatTextColor() {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.formatText(range.index, range.length, 'color', this.textColor);
      }
    },
    changeTextColor(e) {
      this.textColor = e.target.value;
      this.formatTextColor();
    },
  },

};
</script>

<style scoped>

</style>