// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { useImageStore } from "@/stores/cap-images";
import { reBold, reDialogue, reImg, reItalic, reTag } from "@/js/global";
import { useLocalStorage } from "@vueuse/core";

export const useCapTextStore = defineStore('capText', {
  state:   () => ({
    /** @type string */
    rawText: useLocalStorage('capText', ""),
  }),
  getters: {
    htmlText(state) {
      return this.convertText(state.rawText);
    },
  },
  actions: {
    convertText(text) {
      const imageStore = useImageStore();
      text             = text.replace("{img}", "\n\n{img}\n\n");
      text             = text.trimStart();
      text             = text.replace(reTag, '<span class="$1">$2</span>');
      text             = text.replace(reBold, '<b>$1</b>');
      text             = text.replace(reItalic, '<i>$1</i>');
      // i am... not happy with this lol.
      // this is so that images aren't padded along with text
      text = text.replaceAll(/(.+)/gm, (match) => {
        const addOn = ``;
        if (!match.includes("{img}")) {
          return `<p class='capText'>${match}</p>${addOn}`;
        }
        return match + addOn;
      });
      text = text.replaceAll('\n\n', `<div class="capBreak">&nbsp;</div>`);

      let counter = 0;
      text        = text.replace(reImg, (match, $1) => {
        // if user manually specified which image to use, base 1
        if ($1) {
          return `<div class="capImg"><img alt="" src=${imageStore.getImage(
            parseInt($1) - 1)}></div>`;
        }
        return `<div class="capImg"><img alt="" src=${imageStore.getImage(
          counter++)}></div>`;

      });
      return text;
    },
    checkQuotes() {
      const lines    = this.rawText.split('\n');
      const badLines = [];
      for (const line of lines) {
        if ((line.match(/"/g) || []).length % 2 === 1) {
          badLines.push(line);
        }
      }
      return badLines;
    },
    checkNoTag() {
      const badLines = [];
      // so that it doesn't get mixed up on lines with multiple sets of double
      // quotes
      const removedTagText = this.rawText.replaceAll(reTag, (match) => {
        // can't just replace with an empty string or else the positioning for
        // matches will be off
        return ' '.repeat(match.length);
      });

      const matches = removedTagText.matchAll(reDialogue);
      if (matches) {
        for (const match of matches) {
          // this gives the whole match for some reason
          // I will never understand javascript
          badLines.push(match);
        }
      }
      return badLines;
    },
    addTagAtPosition(character, position) {
      this.rawText =
        this.rawText.substring(0,
                               position,
        ) + `[${character}] ` + this.rawText.substring(position);
    },
  },

});
