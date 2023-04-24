<template>
  <div class="btn-group" role="group">
    <input
        v-tooltip
        :value="capStyleStore.getTextStyle()['background-color']"
        class="btn btn-outline-primary"
        style="height: 100%"
        title="Cap Background Color"
        type="color"
        @input="(e) => capStyleStore.setTextStyle({'background-color': e.target.value})">
  </div>
</template>

<script>
import { useCapStyleStore } from "@/stores/cap-style";

export default {
  name: "BackgroundColorButton",
  data() {
    return {
      capStyleStore: useCapStyleStore(),
    };
  },
};
</script>

<style scoped>

</style>