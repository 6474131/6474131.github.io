<template>
  <div class="input-group mb-3">
    <label for="addCharacter" class="input-group-text">Add a character</label>
    <input type="text" class="form-control" ref="newCharacter" id="addCharacter"
           v-on:keyup.enter="(e) => addCharacterToDropdown(e.target.value)">
    <div class="input-group-text btn btn-primary" @click="addCharacterToDropdown($refs.newCharacter.value)">+</div>
  </div>
  <div class="input-group mb-3">
    <label for="currentCharacter" class="input-group-text">Character Names</label>
    <select class="form-select" v-model="currentCharacter" id="currentCharacter">
      <option v-for="name in tags.getCharacterNames()" :value="name">{{ name }}</option>
    </select>
  </div>
  <hr>
  <form class="container-fluid" v-if="currentCharacter">
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto" for="characterFontSize">Character Font Size</label>
      <input type="number" id="characterFontSize" class="form-control col-sm-1" placeholder="Size here..."
             @input="(e) => updateText({'font-size': e.target.value + 'px'})"
             :value="parseInt(tags.getTag(currentCharacter)['font-size'])">
      <label class="input-group-text col-auto" for="characterFontSize">px</label>
    </div>
    <div class="input-group row mb-3">
      <label for="characterNormalColor" class="input-group-text col-auto">Character Text Color</label>
      <input id="characterNormalColor" type="color" class="form-control-color form-control"
             @input="(e) => updateText({'color': e.target.value})"
             :value="tags.getTag(currentCharacter).color">
    </div>
    <div class="row input-group mb-3">
      <label class="input-group-text col-auto">Font Family</label>
      <select class="form-select row form-control" @change="(e) => updateText({'font-family': e.target.value})"
              :value="tags.getTag(currentCharacter)['font-family']">
        <option v-for="font in listFonts()" :value="font">{{ font }}</option>
        <option value="revert">Normal</option>
      </select>
    </div>

    <div class="row mb-3">
      <button type="button" class="btn btn-danger" @click="tags.removeTag(currentCharacter); currentCharacter = ''">
        Remove Character
      </button>
    </div>


    <div :class="currentCharacter">Sample text.</div>
    <div :class="currentCharacter" class="mb-3">More sample text.</div>
    <div class="form-check form-switch row">
      <label class="form-check-label" for="characterTextDebug">Check to see raw CSS produced.</label>
      <input class="form-check-input" type="checkbox" role="switch" id="characterTextDebug" v-model="debug">
    </div>
    <div v-if="debug">
      {{ tags.getTag(currentCharacter) }}
    </div>
  </form>
</template>

<script>
import { useCharacterTagsStore } from "@/stores/character-tags";
import { listFonts } from "@/js/global";

export default {
  name: "TagForm",
  data() {
    return {
      tags:             useCharacterTagsStore(),
      currentCharacter: "",
      debug:            false,
    };
  },
  mounted() {

  },
  methods: {
    listFonts,
    updateText(cssRule) {
      this.tags.setTag(this.currentCharacter, cssRule);
    },
    addCharacterToDropdown(characterName) {
      if (this.tags.getTag(characterName) || characterName.length === 0) {
        return;
      }
      this.currentCharacter = characterName;
      this.updateText({});
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