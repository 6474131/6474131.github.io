<template>
  <div>
    <div class="mb-3">
      Specify an image using: {img} optionally followed by a number to indicate which image number to use (like {img1},
      {img2}).
    </div>
    <textarea class="form-control h-50" v-model="textStore._rawText"></textarea>
  </div>
</template>

<script>
import { useCapTextStore } from "@/stores/cap-text";

export default {
  name: "CapTextArea",
  data() {
    return {textStore: useCapTextStore()};
  },
  methods: {
  },
};
</script>

<style scoped>

</style>