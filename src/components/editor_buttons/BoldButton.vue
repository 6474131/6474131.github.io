<template>
  <button
      v-tooltip
      :class="{active: active}"
      class="bi-type-bold btn btn-outline-primary"
      title="Bold"
      @click="bold"></button>
</template>

<script>

export default {
  name:  "BoldButton",
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
        this.active = range ? this.quill.getFormat(range.index, range.length).hasOwnProperty('bold') : false;
      });
    },
  },
  methods: {
    bold() {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.formatText(range.index, range.length, 'bold', !this.active);
      }
    },
  },
};
</script>

<style scoped>

</style>