<template>
  <div class="btn-toolbar justify-content-center mb-3" role="toolbar">
    <div class="input-group">
      <label class="input-group-text">General Font Settings</label>
      <label class="input-group-text">Family</label>
      <select
        :value="capStyleStore.getTextStyle()['font-family']"
        class="form-select form-control"
        @change="(e) => capStyleStore.setTextStyle({'font-family': e.target.value})">
        <option v-for="font in capStyleStore.listFonts()" :value="font">{{ font }}</option>
        <option value="revert">Normal</option>
      </select>
      <label class="input-group-text">Color</label>
      <input
        :value="capStyleStore.getTextStyle()['color']"
        class="form-control-color form-control" title="Normal Cap Text Color" v-tooltip
        type="color"
        @input="(e) => capStyleStore.setTextStyle({'color': e.target.value})">
      <label class="input-group-text">Size</label>
      <input
        :value="parseInt(capStyleStore.getTextStyle()['font-size'])"
        placeholder="Font size..."
        class="form-control"
        type="number"
        @input="(e) => capStyleStore.setTextStyle({'font-size': e.target.value + 'px'})">
    </div>
  </div>
  <div class="btn-toolbar justify-content-center mb-3" role="toolbar">
    <BackgroundColorButton/>
    <TranscriptButton/>
    <PaddingOptions/>
    <TemplateOptions/>
  </div>
</template>

<script>

import { useCapStyleStore } from "@/stores/cap-style";
import BackgroundColorButton from "@/components/editor_buttons/BackgroundColorButton.vue";
import TranscriptButton from "@/components/editor_buttons/TranscriptButton.vue";
import PaddingOptions from "@/components/sidebar/PaddingOptions.vue";
import TemplateOptions from "@/components/sidebar/TemplateOptions.vue";

export default {
  name:       "MiscToolbar",
  components: {
    TemplateOptions,
    PaddingOptions,
    TranscriptButton,
    BackgroundColorButton,
  },
  data() {
    return {
      capStyleStore: useCapStyleStore(),
    };
  },
};
</script>


<style scoped>

</style>