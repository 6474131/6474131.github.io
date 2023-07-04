<template>
  <div class="input-group" role="group">
    <div class="input-group-text">
      Cap Background Color
    </div>
  </div>
  <input
    v-tooltip
    :value="capStyleStore.getTextStyle()['background-color']"
    class="form-control form-control-color"
    title="Cap Background Color"
    type="color"
    @input="(e) => capStyleStore.setTextStyle({'background-color': e.target.value})">
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