<template>
  <form class="container-fluid">
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capFontSize">Cap Font Size</label>
      <input
          type="number" id="capFontSize" class="form-control col-sm-1" placeholder="Size here..."
          @input="(e) => capStyleStore.setTextStyle({'font-size': e.target.value + 'px'})"
          :value="parseInt(capStyleStore.getTextStyle()['font-size'])">
      <label class="input-group-text col-auto" for="capFontSize">px</label>
    </div>
    <div class="input-group row mb-3">
      <label for="capNormalColor" class="input-group-text col-auto">Cap Text Color</label>
      <input
          id="capNormalColor" type="color" class="form-control-color form-control"
          @input="(e) => capStyleStore.setTextStyle({'color': e.target.value})"
          :value="capStyleStore.getTextStyle()['color']">
    </div>
    <div class="input-group row mb-3">
      <label for="capBackgroundColor" class="input-group-text col-auto">Cap Background Color</label>
      <input
          id="capBackgroundColor" type="color" class="form-control-color form-control"
          @input="(e) => capStyleStore.setTextStyle({'background-color': e.target.value})"
          :value="capStyleStore.getTextStyle()['background-color']">
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capLineHeight">Cap Line Height</label>
      <input
          type="text" id="capLineHeight" class="form-control col-sm-1"
          @input="(e) => capStyleStore.setCapTextStyle({'line-height': e.target.value})"
          :value="capStyleStore.getCapTextStyle()['line-height']">
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="paragraphBreakHeight">Paragraph Break Height</label>
      <input
          type="text" id="paragraphBreakHeight" class="form-control col-sm-1"
          @input="(e) => capStyleStore.setCapBreakStyle({'line-height': e.target.value})"
          :value="capStyleStore.getCapBreakStyle()['line-height']">
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capPaddingLeft">Text Padding Left</label>
      <input
          type="number" id="capPaddingLeft" class="form-control col-sm-1"
          @input="(e) => capStyleStore.setCapTextStyle({'padding-left': e.target.value + 'px'})"
          :value="parseInt(capStyleStore.getCapTextStyle()['padding-left'])">
      <label class="input-group-text col-auto" for="capPaddingLeft">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="capPaddingRight">Text Padding Right</label>
      <input
          type="number" id="capPaddingRight" class="form-control col-sm-1"
          @input="(e) => capStyleStore.setCapTextStyle({'padding-right': e.target.value + 'px'})"
          :value="parseInt(capStyleStore.getCapTextStyle()['padding-right'])">
      <label class="input-group-text col-auto" for="capPaddingRight">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="imgPaddingLeft">Image Padding Left</label>
      <input
          type="number" id="imgPaddingLeft" class="form-control col-sm-1"
          @input="(e) => capStyleStore.setCapImgStyle({'padding-left': e.target.value + 'px'})"
          :value="parseInt(capStyleStore.getCapImgStyle()['padding-left'])">
      <label class="input-group-text col-auto" for="imgPaddingLeft">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="imgPaddingRight">Image Padding Right</label>
      <input
          type="number" id="imgPaddingRight" class="form-control col-sm-1"
          @input="(e) => capStyleStore.setCapImgStyle({'padding-right': e.target.value + 'px'})"
          :value="parseInt(capStyleStore.getCapImgStyle()['padding-right'])">
      <label class="input-group-text col-auto" for="imgPaddingRight">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="imgPaddingTop">Image Padding Top</label>
      <input
          type="number" id="imgPaddingTop" class="form-control col-sm-1"
          @input="(e) => capStyleStore.setCapImgStyle({'padding-top': e.target.value + 'px'})"
          :value="parseInt(capStyleStore.getCapImgStyle()['padding-top'])">
      <label class="input-group-text col-auto" for="imgPaddingTop">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="imgPaddingBottom">Image Padding Bottom</label>
      <input
          type="number" id="imgPaddingBottom" class="form-control col-sm-1"
          @input="(e) => capStyleStore.setCapImgStyle({'padding-bottom': e.target.value + 'px'})"
          :value="parseInt(capStyleStore.getCapImgStyle()['padding-bottom'])">
      <label class="input-group-text col-auto" for="imgPaddingBottom">px</label>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto">Text Alignment</label>
      <select
          class="form-select row form-control"
          @change="(e) => capStyleStore.setTextStyle({'text-align': e.target.value})"
          :value="capStyleStore.getTextStyle()['text-align']">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto">Font Family</label>
      <select
          class="form-select row form-control"
          @change="(e) => capStyleStore.setTextStyle({'font-family': e.target.value})"
          :value="capStyleStore.getTextStyle()['font-family']">
        <option v-for="font in capStyleStore.listFonts()" :value="font">{{ font }}</option>
        <option value="revert">Normal</option>
      </select>
    </div>


    <div class="capContainer">Sample text.</div>
    <div class="capContainer mb-3">More sample text.</div>
    <div class="form-check form-switch row">
      <label class="form-check-label" for="characterTextDebug">Check to see raw CSS produced.</label>
      <input class="form-check-input" type="checkbox" role="switch" id="characterTextDebug" v-model="debug">
    </div>
    <div v-if="debug">
      {{ capStyleStore.getTextStyle() }}
    </div>
  </form>
</template>

<script>
import { useCapStyleStore } from "@/stores/cap-style";

export default {
  name: "CapSettings",
  data() {
    return {
      capStyleStore: useCapStyleStore(),
      debug:         false,
    };
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