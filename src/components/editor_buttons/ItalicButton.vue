<template>
  <button
      v-tooltip
      :class="{active: active}"
      class="bi-type-italic btn btn-outline-primary"
      title="Italicize"
      @click="italic"></button>
</template>

<script>

export default {
  name:  "ItalicButton",
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
      active: false,
    };
  },
  watch:   {
    editorReady() {
      this.quill.on('editor-change', () => {
        const range = this.quill.getSelection();
        this.active = range ? this.quill.getFormat(range.index, range.length).hasOwnProperty('italic') : false;
      });
    },
  },
  methods: {
    italic() {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.formatText(range.index, range.length, 'italic', !this.active);
      }
    },
  },
};
</script>

<style scoped>

</style>