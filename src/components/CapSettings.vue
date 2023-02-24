<template>
  <form class="container-fluid">
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capFontSize">Cap Font Size</label>
      <input type="number" id="capFontSize" class="form-control col-sm-1" placeholder="Size here..."
             @input="(e) => updateBodyStyle({'font-size': e.target.value + 'px'})"
             :value="parseInt(store.getTextStyle()['font-size'])">
      <label class="input-group-text col-auto" for="capFontSize">px</label>
    </div>
    <div class="input-group row mb-3">
      <label for="capNormalColor" class="input-group-text col-auto">Cap Text Color</label>
      <input id="capNormalColor" type="color" class="form-control-color form-control"
             @input="(e) => updateBodyStyle({'color': e.target.value})"
             :value="store.getTextStyle()['color']">
    </div>
    <div class="input-group row mb-3">
      <label for="capBackgroundColor" class="input-group-text col-auto">Cap Background Color</label>
      <input id="capBackgroundColor" type="color" class="form-control-color form-control"
             @input="(e) => updateBodyStyle({'background-color': e.target.value})"
             :value="store.getTextStyle()['background-color']">
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capLineHeight">Cap Line Height</label>
      <input type="number" id="capLineHeight" class="form-control col-sm-1"
             @input="(e) => updateBodyStyle({'line-height': e.target.value})"
             :value="store.getTextStyle()['line-height']">
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capPaddingLeft">Text Padding Left</label>
      <input type="number" id="capPaddingLeft" class="form-control col-sm-1"
             @input="(e) => updateBodyStyle({'padding-left': e.target.value + 'px'})"
             :value="parseInt(store.getTextStyle()['padding-left'])">
      <label class="input-group-text col-auto" for="capPaddingLeft">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capPaddingRight">Text Padding Right</label>
      <input type="number" id="capPaddingRight" class="form-control col-sm-1"
             @input="(e) => updateBodyStyle({'padding-right': e.target.value + 'px'})"
             :value="parseInt(store.getTextStyle()['padding-right'])">
      <label class="input-group-text col-auto" for="capPaddingRight">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto">Text Alignment</label>
      <select class="form-select row form-control" @change="(e) => updateBodyStyle({'text-align': e.target.value})"
              :value="store.getTextStyle()['text-align']">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto">Font Family</label>
      <select class="form-select row form-control" @change="(e) => updateBodyStyle({'font-family': e.target.value})"
              :value="store.getTextStyle()['font-family']">
        <option v-for="font in listFonts()" :value="font">{{ font }}</option>
        <option value="revert">Normal</option>
      </select>
    </div>


    <div class="capContainer">Sample text.</div>
    <div class="capContainer mb-3">More sample text.</div>
    <div class="form-check form-switch row">
      <label class="form-check-label" for="capSettingsDebug">Check to see raw CSS produced.</label>
      <input class="form-check-input" type="checkbox" role="switch" id="capSettingsDebug" v-model="debug">
    </div>
    <div v-if="debug">
      {{ store.getTextStyle() }}
    </div>
  </form>
</template>

<script>
import { useCapStyleStore } from "@/stores/cap-style";
import { listFonts } from "@/js/global";

export default {
  name: "CapSettings",
  data() {
    return {store: useCapStyleStore(), debug: false};
  },
  methods: {
    listFonts,
    updateBodyStyle(cssRule) {
      this.store.setTextStyle(cssRule);
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>