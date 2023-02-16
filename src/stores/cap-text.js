import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useImageStore } from "@/stores/cap-images";

const reTag      = /\[(.+?)]\s{0,2}("?.+?(?:"|\n|$))/g;
const reItalic   = /(?<!\\)\*(.+?)(?<!\\)\*/g;
const reBold     = /\*\*(.+?)\*\*/g;
const reUniQuote = /[\u201C\u201D]/g;
const reImg      = /\{img(\d+)?}/g;

export const useCapTextStore = defineStore('capText', () => {
  const _rawText      = ref("");
  const imageStore    = useImageStore();
  const htmlText      = computed(() => {
    return convertText(_rawText.value);
  });
  const textInStorage = localStorage.getItem('capText');
  if (textInStorage) {
    _rawText.value = JSON.parse(textInStorage);
  }

  watch(() => _rawText.value, (state) => {
    localStorage.setItem('capText', JSON.stringify(state));
  }, {deep: true});

  function setText(text) {
    _rawText.value = text;
  }

  function getText() {
    return _rawText.value;
  }

  function convertText(text) {
    text = text.replace(reUniQuote, '"');
    text = text.replace(reTag, '<span class="$1">$2</span>');
    text = text.replace(reBold, '<b>$1</b>');
    text = text.replace(reItalic, '<i>$1</i>');
    text = text.replaceAll('\n', '<br>');

    let counter = 0;
    text        = text.replace(reImg, (match, $1) => {
      // if user manually specified which image to use, base 1
      if ($1) {
        return `<img alt="" class="capImg" src=${imageStore.getImage(parseInt($1) - 1)}>`;
      }
      return `<img alt="" class="capImg" src=${imageStore.getImage(counter++)}>`;

    });
    return text;
  }

  function checkQuotes() {
    const lines    = _rawText.value.split('\n');
    const badLines = [];
    for (const line of lines) {
      if ((line.match(/"/g) || []).length % 2 === 1) {
        badLines.push(line);
      }
    }
    return badLines;
  }

  function checkNoTag() {
    const badLines = [];
    // so that it doesn't get mixed up on lines with multiple sets of double
    // quotes
    const removedTagText = _rawText.value.replaceAll(reTag, (match) => {
      // can't just replace with an empty string or else the positioning for
      // matches will be off
      return ' '.repeat(match.length);
    });
    const matches        = removedTagText.matchAll(/(?<!\[\w+]\s+)".*?"/g);
    if (matches) {
      for (const match of matches) {
        // this gives the whole match for some reason
        // i will never understand javascript
        badLines.push(match);
      }
    }
    return badLines;
  }

  function addTagAtPosition(character, position) {
    _rawText.value =
      _rawText.value.substring(
        0,
        position,
      ) + `[${character}] ` + _rawText.value.substring(position);

  }

  return {
    _rawText,
    htmlText,
    setText,
    checkQuotes,
    checkNoTag,
    addTagAtPosition,
  };
});
