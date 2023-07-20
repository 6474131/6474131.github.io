<template>
  <button
    data-bs-target="#paddingOffcanvas" data-bs-toggle="offcanvas" title="Padding Options"
    class="btn btn-outline-primary" v-tooltip> Padding Options
  </button>
  <Offcanvas offcanvas-id="paddingOffcanvas" header-name="Padding">
    <div>
      Text
    </div>
    <div class="input-group">
      <label class="input-group-text" for="capPaddingLeft">Left</label>
      <input
        id="capPaddingLeft"
        :value="parseInt(capStyleStore.getCapTextStyle()['padding-left'])"
        class="form-control col-sm-1"
        type="number"
        @input="(e) => capStyleStore.setCapTextStyle({'padding-left': e.target.value + 'px'})">

      <label class="input-group-text" for="capPaddingRight">Right</label>
      <input
        id="capPaddingRight"
        :value="parseInt(capStyleStore.getCapTextStyle()['padding-right'])"
        class="form-control col-sm-1"
        type="number"
        @input="(e) => capStyleStore.setCapTextStyle({'padding-right': e.target.value + 'px'})">

    </div>
    <div v-if="capSettingsStore.currentTemplate !== 'one_col'" class="input-group mb-3">
      <label class="input-group-text" for="capPaddingTop">Top</label>
      <input
        id="capPaddingTop"
        :value="parseInt(capStyleStore.getCapColStyle()['padding-top'])"
        class="form-control col-sm-1"
        type="number"
        @input="(e) => capStyleStore.setCapColStyle({'padding-top': e.target.value + 'px'})">

      <label class="input-group-text" for="capPaddingBottom">Bottom</label>
      <input
        id="capPaddingBottom"
        :value="parseInt(capStyleStore.getCapColStyle()['padding-bottom'])"
        class="form-control col-sm-1"
        type="number"
        @input="(e) => capStyleStore.setCapColStyle({'padding-bottom': e.target.value + 'px'})">

    </div>
    <div>
      Image
    </div>
    <div class="input-group">
      <label class="input-group-text" for="imgPaddingLeft">Left</label>
      <input
        id="imgPaddingLeft"
        :value="parseInt(capStyleStore.getCapImgStyle()['padding-left'])"
        class="form-control col-sm-1"
        type="number"
        @input="(e) => capStyleStore.setCapImgStyle({'padding-left': e.target.value + 'px'})">

      <label class="input-group-text" for="imgPaddingRight">Right</label>
      <input
        id="imgPaddingRight"
        :value="parseInt(capStyleStore.getCapImgStyle()['padding-right'])"
        class="form-control col-sm-1"
        type="number"
        @input="(e) => capStyleStore.setCapImgStyle({'padding-right': e.target.value + 'px'})">
    </div>
    <div class="input-group">
      <label class="input-group-text" for="imgPaddingTop">Top</label>
      <input
        id="imgPaddingTop"
        :value="parseInt(capStyleStore.getCapImgStyle()['padding-top'])"
        class="form-control col-sm-1"
        type="number"
        @input="(e) => capStyleStore.setCapImgStyle({'padding-top': e.target.value + 'px'})">

      <label class="input-group-text" for="imgPaddingBottom">Bottom</label>
      <input
        id="imgPaddingBottom"
        :value="parseInt(capStyleStore.getCapImgStyle()['padding-bottom'])"
        class="form-control col-sm-1"
        type="number"
        @input="(e) => capStyleStore.setCapImgStyle({'padding-bottom': e.target.value + 'px'})">
    </div>
  </Offcanvas>
</template>

<script>

import Offcanvas from "@/components/sidebar/Offcanvas.vue";
import { useCapStyleStore } from "@/stores/cap-style";
import { useCapSettingsStore } from "@/stores/cap-settings";

export default {
  name:       "PaddingOptions",
  components: {Offcanvas},
  data() {
    return {
      capStyleStore:    useCapStyleStore(),
      capSettingsStore: useCapSettingsStore(),
    };
  },
};
</script>


<style scoped>

</style>