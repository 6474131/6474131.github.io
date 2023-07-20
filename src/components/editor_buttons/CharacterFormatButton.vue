<template>
    <div class="btn-group" role="group">
      <button
        v-tooltip
        :class="{active: dumbActive}"
        class="btn btn-outline-primary"
        title="Color Any Piece of Text"
        @click="formatCharacter">Dumb mark text as:
      </button>
      <button
        v-tooltip
        :class="{active: active}"
        class="btn btn-outline-primary"
        title="Color Character Dialogue"
        @click="active = !active">Smart mark text as:
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
import { validateFormat } from "@/js/global";

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
      dumbActive:        false,
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
      this.quill.on('editor-change', () => {
        const range = this.quill.getSelection();
        if (range) {
          const characterTags = this.quill.getFormat(range.index, range.length)['characterTag'];
          const validTag      = validateFormat(characterTags);
          this.dumbActive     = validTag != null;
        }
        else {
          this.dumbActive = false;
        }
      });
    },
  },
  methods:  {
    formatCharacter() {
      const range = this.quill.getSelection();
      if (range) {
        if (this.dumbActive) {
          this.quill.formatText(range.index, range.length, 'characterTag', false);
        }
        else {
          this.quill.formatText(range.index, range.length, 'characterTag', this.currentCharacter);
        }
      }
    },
  },
};
</script>

<style scoped>

</style>