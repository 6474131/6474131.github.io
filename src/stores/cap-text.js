// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { reDialogue } from "@/js/global";
import { useLocalStorage } from "@vueuse/core";

class QuoteRange {

  constructor(index, length) {
    this.index  = index;
    this.length = length;
  }
}

export const useCapTextStore = defineStore('capText', {
  state:   () => ({
    /** @type Delta|array */
    rawDelta:    useLocalStorage('capDelta', {}),
    rawText:     "",
    rawHTML:     "",
    firstHalf:   "",
    secondHalf:  "",
    middleImage: "",
    noImageHTML: "",
  }),
  actions: {
    splitText() {
      const parser  = new DOMParser();
      const htmlDoc = parser.parseFromString(this.rawHTML, 'text/html');

      const paragraphs = Array.from(htmlDoc.getElementsByTagName('p'));
      const img        = htmlDoc.getElementsByTagName('img')[0];  // Get the
                                                                  // first
                                                                  // image from
                                                                  // HTML

      // If the image is within a <p> tag, we want to remove it from the array
      // of paragraphs.
      if (img == null) {
        return;

      }
      const parentElement = img.parentElement;
      if (parentElement.tagName.toLowerCase() === 'p') {
        const index = paragraphs.findIndex(p => p.isEqualNode(parentElement));
        if (index !== -1) {
          paragraphs.splice(index, 1);
        }
      }

      const half       = Math.ceil(paragraphs.length / 2);
      const firstHalf  = paragraphs.slice(0, half);
      const secondHalf = paragraphs.slice(half);

      this.firstHalf   = firstHalf.map(
        p => p.outerHTML).join('');
      this.secondHalf  = secondHalf.map(
        p => p.outerHTML).join('');
      this.noImageHTML = this.firstHalf + this.secondHalf;
      this.middleImage = img.src;

    },
    /**
     * Finds the index of the start of the line at the given index.
     * @param {number} index The index to find the linestart index at.
     * @returns {number} The index of the start of the line.
     */
    getLineStartIndex(index) {
      if (index === 0) {
        return 0;
      }

      let lineIndex = 0;

      for (let i = 0; i < index; i++) {
        if (this.rawText[i] === '\n') {
          lineIndex = i + 1;
        }
      }
      return lineIndex;
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
  },

});
