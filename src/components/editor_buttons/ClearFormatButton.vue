<template>

    <button
            v-tooltip
            class="bi-brush btn btn-outline-primary"
            title="Clear Format"
            @click="clearFormat"></button>
</template>

<script>
export default {
  name:    "ClearFormatButton",
  props:   {
    quill:       {
      default:  null,
      required: true,
    },
    editorReady: {
      default:  false,
      required: true,
    },
  },
  methods: {
    clearFormat() {
      const range           = this.quill.getSelection();
      const formatsToRemove = [
        'italic',
        'bold',
        'textcolor',
        'characterTag',
      ];
      if (range) {
        for (const format of formatsToRemove) {
          this.quill.formatText(range.index, range.length, format, false);
        }
      }
    },
  },
};
</script>

<style scoped>

</style>