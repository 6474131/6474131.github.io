<template>
  <div class="input-group">
    <button :class="{active: capSettingsStore.useGivenWidth}"
            @click="capSettingsStore.useGivenWidth = !capSettingsStore.useGivenWidth"
            class="btn input-group-text btn-outline-primary">
      Use given width?
    </button>
    <input
      :value="capSettingsStore.width" class="form-control"
      placeholder="Insert Cap Width..."
      type="number"
      @input="(e) => capSettingsStore.width = parseInt(e.target.value)"
      :disabled="!capSettingsStore.useGivenWidth">
    <div class="input-group-text">px</div>
    <div class="input-group">
      <button :class="{active: capSettingsStore.useGivenHeight}"
              @click="capSettingsStore.useGivenHeight = !capSettingsStore.useGivenHeight"
              class="btn input-group-text btn-outline-primary">
        Use given height?
      </button>
      <input
        :value="capSettingsStore.height" class="form-control"
        placeholder="Insert Cap Height..."
        type="number"
        @input="(e) => capSettingsStore.height = parseInt(e.target.value)"
        :disabled="!capSettingsStore.useGivenHeight">
      <div class="input-group-text">px</div>
    </div>
  </div>


</template>

<script>

import { useCapSettingsStore } from "@/stores/cap-settings";
import { useCapStyleStore } from "@/stores/cap-style";

export default {
  name: "SetCapSize",
  data() {
    return {
      capSettingsStore: useCapSettingsStore(),
      capStyleStore:    useCapStyleStore(),
    };
  },
};
</script>


<style scoped>

</style>