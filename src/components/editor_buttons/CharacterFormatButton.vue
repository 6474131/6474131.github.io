<template>
    <div class="btn-group" role="group">
        <button
                v-tooltip
                :class="{active: active}"
                class="btn btn-outline-primary"
                title="Color Character Dialogue"
                @click="active = !active">Mark text as:
        </button>
        <select
                v-model="currentCharacter"
                v-tooltip
                class="btn btn-outline-primary dropdown-toggle"
                title="Chosen Character">
            <option v-for="{name, val} in characterList" :value="val" class="dropdown-item">{{
                name
                }}
            </option>
        </select>
    </div>
</template>

<script>

import { useCharacterTagsStore } from "@/stores/character-tags";
import { useCapTextStore } from "@/stores/cap-text";

export default {
  name:  "CharacterButton",
  props: {
    quill:       {
      default:  null,
      required: true,
    },
    editorReady: {
      default:  false,
      required: true,
    },
  },
  data() {
    return {
      capCharacterStore: useCharacterTagsStore(),
      capTextStore:      useCapTextStore(),
      currentCharacter:  "",
      active:            false,
    };
  },
  computed: {
    characterList() {
      const characterList = [];
      for (const character of this.capCharacterStore.getCharacterNames()) {
        characterList.push({
                             name: character,
                             val:  character,
                           });
      }

      return characterList;
    },
  },
  watch:    {
    editorReady() {
      this.quill.on('selection-change', () => {
        const range = this.quill.getSelection();
        if (range && this.active) {
          const quotedText = this.capTextStore.getRangeOfQuoteAtIndex(range.index);
          if (quotedText) {
            this.quill.formatText(quotedText.index, quotedText.length, 'characterTag', this.currentCharacter);

          }
        }
      });
    },
  },
};
</script>

<style scoped>

</style>