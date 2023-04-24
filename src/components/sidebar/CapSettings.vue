<template>
  <form class="container-fluid">
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capLineHeight">Cap Line Height</label>
      <input
          id="capLineHeight" :value="capStyleStore.getCapTextStyle()['line-height']" class="form-control col-sm-1"
          type="text"
          @input="(e) => capStyleStore.setCapTextStyle({'line-height': e.target.value})">
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="paragraphBreakHeight">Paragraph Break Height</label>
      <input
          id="paragraphBreakHeight"
          :value="capStyleStore.getCapBreakStyle()['line-height']"
          class="form-control col-sm-1"
          type="text"
          @input="(e) => capStyleStore.setCapBreakStyle({'line-height': e.target.value})">
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capPaddingLeft">Text Padding Left</label>
      <input
          id="capPaddingLeft"
          :value="parseInt(capStyleStore.getCapTextStyle()['padding-left'])"
          class="form-control col-sm-1"
          type="number"
          @input="(e) => capStyleStore.setCapTextStyle({'padding-left': e.target.value + 'px'})">
      <label class="input-group-text col-auto" for="capPaddingLeft">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capPaddingRight">Text Padding Right</label>
      <input
          id="capPaddingRight"
          :value="parseInt(capStyleStore.getCapTextStyle()['padding-right'])"
          class="form-control col-sm-1"
          type="number"
          @input="(e) => capStyleStore.setCapTextStyle({'padding-right': e.target.value + 'px'})">
      <label class="input-group-text col-auto" for="capPaddingRight">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="imgPaddingLeft">Image Padding Left</label>
      <input
          id="imgPaddingLeft"
          :value="parseInt(capStyleStore.getCapImgStyle()['padding-left'])"
          class="form-control col-sm-1"
          type="number"
          @input="(e) => capStyleStore.setCapImgStyle({'padding-left': e.target.value + 'px'})">
      <label class="input-group-text col-auto" for="imgPaddingLeft">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="imgPaddingRight">Image Padding Right</label>
      <input
          id="imgPaddingRight"
          :value="parseInt(capStyleStore.getCapImgStyle()['padding-right'])"
          class="form-control col-sm-1"
          type="number"
          @input="(e) => capStyleStore.setCapImgStyle({'padding-right': e.target.value + 'px'})">
      <label class="input-group-text col-auto" for="imgPaddingRight">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="imgPaddingTop">Image Padding Top</label>
      <input
          id="imgPaddingTop"
          :value="parseInt(capStyleStore.getCapImgStyle()['padding-top'])"
          class="form-control col-sm-1"
          type="number"
          @input="(e) => capStyleStore.setCapImgStyle({'padding-top': e.target.value + 'px'})">
      <label class="input-group-text col-auto" for="imgPaddingTop">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="imgPaddingBottom">Image Padding Bottom</label>
      <input
          id="imgPaddingBottom"
          :value="parseInt(capStyleStore.getCapImgStyle()['padding-bottom'])"
          class="form-control col-sm-1"
          type="number"
          @input="(e) => capStyleStore.setCapImgStyle({'padding-bottom': e.target.value + 'px'})">
      <label class="input-group-text col-auto" for="imgPaddingBottom">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto">Font Family</label>
      <select
          :value="capStyleStore.getTextStyle()['font-family']"
          class="form-select row form-control"
          @change="(e) => capStyleStore.setTextStyle({'font-family': e.target.value})">
        <option v-for="font in capStyleStore.listFonts()" :value="font">{{ font }}</option>
        <option value="revert">Normal</option>
      </select>
    </div>
    <form class="container-fluid">
      <div class="form-check form-switch mb-3">
        <label class="form-check-label" for="useWidth">Do you want to use a given width?
        </label>
        <input
            id="useWidth" v-model="capSettingsStore.useGivenWidth" class="form-check-input" role="switch"
            type="checkbox">
      </div>
      <div v-if="capSettingsStore.useGivenWidth" class="row input-group mb-3">
        <label class="input-group-text col-auto" for="capWidth">Cap Width</label>
        <input
            id="capWidth" :value="capSettingsStore.width" class="form-control col-sm-1" placeholder="Size here..."
            type="number"
            @input="(e) => capSettingsStore.width = parseInt(e.target.value)">
        <label class="input-group-text col-auto" for="characterFontSize">px</label>
      </div>
    </form>
    <button class="btn btn-danger mb-3" type="button" @click="clearCache()">Clear Cache</button>
    <div class="capContainer">Sample text.</div>
    <div class="capContainer mb-3">More sample text.</div>
    <div class="form-check form-switch row">
      <label class="form-check-label" for="settingsDebug">Check to see raw CSS produced.</label>
      <input id="settingsDebug" v-model="debug" class="form-check-input" role="switch" type="checkbox">
    </div>
    <div v-if="debug">
      {{ capStyleStore.getTextStyle() }}
    </div>
  </form>
</template>

<script>
import { useCapStyleStore } from "@/stores/cap-style";
import { useCapSettingsStore } from "@/stores/cap-settings";

export default {
  name: "CapSettings",
  data() {
    return {
      capStyleStore:    useCapStyleStore(),
      capSettingsStore: useCapSettingsStore(),
      debug:            false,
      useGivenWidth:    false,
    };
  },
  methods: {
    clearCache() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>

<style scoped>
/*input::-webkit-outer-spin-button*/
/*input::-webkit-inner-spin-button {*/
/*  -webkit-appearance: none;*/
/*  margin: 0;*/
/*}*/
</style>