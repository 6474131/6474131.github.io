<template>
    <div class="input-group mb-3">
        <label class="input-group-text" for="addCharacter">Add a character</label>
        <input
                id="addCharacter" ref="newCharacter" class="form-control" type="text"
                v-on:keyup.enter="(e) => addCharacterToDropdown(e.target.value)">
        <div class="input-group-text btn btn-primary" @click="addCharacterToDropdown($refs.newCharacter.value)">+</div>
    </div>
    <div class="input-group mb-3">
        <label class="input-group-text" for="currentCharacter">Character Names</label>
        <select id="currentCharacter" v-model="currentCharacter" class="form-select">
            <option v-for="name in capCharacterStore.getCharacterNames()" :value="name">{{ name }}</option>
        </select>
    </div>
    <hr>
    <form v-if="currentCharacter" class="container-fluid">
        <div class="row input-group mb-3">
            <label class="input-group-text col-auto" for="characterFontSize">Character Font Size</label>
            <input
                    id="characterFontSize"
                    :value="parseInt(capCharacterStore.getTag(currentCharacter)['font-size'])"
                    class="form-control col-sm-1"
                    placeholder="Size here..."
                    type="number"
                    @input="(e) => updateText({'font-size': e.target.value + 'px'})">
            <label class="input-group-text col-auto" for="characterFontSize">px</label>
        </div>
        <div class="input-group row mb-3">
            <label class="input-group-text col-auto" for="characterNormalColor">Character Text Color</label>
            <input
                    id="characterNormalColor"
                    :value="capCharacterStore.getTag(currentCharacter).color"
                    class="form-control-color form-control"
                    type="color"
                    @input="(e) => updateText({'color': e.target.value})">
        </div>
        <div class="row input-group mb-3">
            <label class="input-group-text col-auto">Font Family</label>
            <select
                    :value="capCharacterStore.getTag(currentCharacter)['font-family']"
                    class="form-select row form-control"
                    @change="(e) => updateText({'font-family': e.target.value})">
                <option v-for="font in capStyleStore.listFonts()" :value="font">{{ font }}</option>
                <option value="revert">Normal</option>
            </select>
        </div>

        <div class="row mb-3">
            <button
                    class="btn btn-danger"
                    type="button"
                    @click="capCharacterStore.removeTag(currentCharacter); currentCharacter = ''">
                Remove Character
            </button>
        </div>


        <div :class="currentCharacter">Sample text.</div>
        <div :class="currentCharacter" class="mb-3">More sample text.</div>
        <div class="form-check form-switch row">
            <label class="form-check-label" for="characterTextDebug">Check to see raw CSS produced.</label>
            <input id="characterTextDebug" v-model="debug" class="form-check-input" role="switch" type="checkbox">
        </div>
        <div v-if="debug">
            {{ characterTagsStore.getTag(currentCharacter) }}
        </div>
    </form>
</template>

<script>
import { useCharacterTagsStore } from "@/stores/character-tags";
import { useCapStyleStore } from "@/stores/cap-style";

export default {
  name: "TagForm",
  data() {
    return {
      capCharacterStore: useCharacterTagsStore(),
      capStyleStore:     useCapStyleStore(),
      currentCharacter:  "",
      debug:             false,
    };
  },
  mounted() {
    // so that it autosets to the first character
    const names = this.capCharacterStore.getCharacterNames();
    if (names.length > 0) {
      this.currentCharacter = names[0];
    }
  },
  methods: {
    updateText(cssRule) {
      this.capCharacterStore.setTag(this.currentCharacter, cssRule);
    },
    addCharacterToDropdown(characterName) {
      if (this.capCharacterStore.getTag(characterName) || characterName.length === 0) {
        return;
      }
      this.currentCharacter = characterName;
      this.updateText({});
    },
  },
};
</script>

<style scoped>
/*input::-webkit-outer-spin-button,*/
/*input::-webkit-inner-spin-button {*/
/*  -webkit-appearance: none;*/
/*  margin: 0;*/
/*}*/
</style>