// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { useImageStore } from "@/stores/cap-images";
import { reDialogue, reImg } from "@/js/global";
import { useLocalStorage } from "@vueuse/core";

class QuoteRange {

  constructor(index, length) {
    this.index  = index;
    this.length = length;
  }
}

export const useCapTextStore = defineStore('capText', {
  state:   () => ({
    rawDelta: useLocalStorage('capDelta', {}),
    rawText:  useLocalStorage('capText', ""),
    rawHTML:  useLocalStorage('capHTML', ""),
  }),
  getters: {
    htmlText(state) {
      return "";
      // return this.convertText(state.rawText);
    },
  },
  actions: {
    /**
     * Finds the index of the start of the line at the given index.
     * @param {number} index The index to find the linestart index at.
     * @returns {number} The index of the start of the line.
     */
    getLineStartIndex(index) {
      let lineIndex = 0;

      for (let i = 0; i < index; i++) {
        if (this.rawText[i] === '\n') {
          lineIndex = i;
        }
      }
      return lineIndex + 1;
    },
    /**
     * Gets the line of text at the given index.
     *
     * @param {number} index The given index to find the line at.
     * @returns {string} The line at the index. Will always return a valid line
     *   as long as rawText is at least a 0 length string.
     */
    getLineAtIndex(index) {
      let counter = 0;

      for (let i = 0; i < index; i++) {
        if (this.rawText[i] === '\n') {
          counter++;
        }
      }
      const lines = this.rawText.split('\n');
      return lines[counter];
    },
    /**
     * Returns the range of a possible quote range at the given index. It's so
     * that a user can 'select' a piece of dialogue easily for formatting.
     *
     * @param {number} index The index the cursor is at.
     * @returns {QuoteRange|null} Returns a QuoteRange if the cursor is inside
     *   a valid range, otherwise null.
     */
    getRangeOfQuoteAtIndex(index) {
      // get the line at the index as a string,
      // then get the offset on that line,
      // with these two pieces of information we can more easily determine if
      // the cursor falls inbetween the bounds of a valid quote
      const currentLine = this.getLineAtIndex(index);
      const lineIndex   = this.getLineStartIndex(index);

      const matches = currentLine.matchAll(reDialogue);
      for (const match of matches) {
        const beginningIndex = lineIndex + match.index;
        const endingIndex    = lineIndex + match.index + match[0].length;

        if (index > beginningIndex && index < endingIndex) {
          return new QuoteRange(beginningIndex, match[0].length);
        }
      }
      return null;
    },
    convertText(text) {
      const imageStore = useImageStore();
      // text             = text.replace("{img}", "\n\n{img}\n\n");
      text             = text.trimStart();
      // text             =
      //   text.replaceAll('\n\n', `<div class="capBreak">&nbsp;</div>`);

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
      // const lines    = this.rawText.split('\n');
      // const badLines = [];
      // for (const line of lines) {
      //   if ((line.match(/"/g) || []).length % 2 === 1) {
      //     badLines.push(line);
      //   }
      // }
      // return badLines;
      return true;
    },
    checkNoTag() {
      // const badLines = [];
      // // so that it doesn't get mixed up on lines with multiple sets of
      // double // quotes const removedTagText = this.rawText.replaceAll(reTag,
      // (match) => { // can't just replace with an empty string or else the
      // positioning for // matches will be off return '
      // '.repeat(match.length); });  const matches =
      // removedTagText.matchAll(reDialogue); if (matches) { for (const match
      // of matches) { // this gives the whole match for some reason // I will
      // never understand javascript badLines.push(match); } } return badLines;
      return [];
    },
  },

});
