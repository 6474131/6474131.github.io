import { defineStore } from 'pinia';
import { create } from "jss";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

const jss = create()
  .setup({
           createGenerateId() {
             return function (rule) {
               return rule.key;
             };
           },
         });

export const useCharacterTagsStore = defineStore('characterTags', () => {
  const tagJss = ref({});
  const tags   = ref(useLocalStorage('characterTags', {}));
  for (const [characterName, characterCssJson] of Object.entries(tags.value)) {
    setTag(characterName, characterCssJson);
  }

  function setTag(characterName, cssJson) {
    let oldCssJson = {};
    if (characterName in tags.value) {
      oldCssJson = tags.value[characterName];
    }

    // overwrite the old JSON with the new values
    for (const [key, value] of Object.entries(cssJson)) {
      oldCssJson[key] = value;
    }
    tags.value[characterName] = oldCssJson;

    if (characterName in tagJss.value) {
      jss.removeStyleSheet(tagJss.value[characterName]);
    }
    const newSheet = jss.createStyleSheet({[characterName]: oldCssJson});
    newSheet.attach();
    tagJss.value[characterName] = newSheet;
  }

  function getTag(characterName) {
    const characterJson = tags.value[characterName];
    if (characterJson) {
      return characterJson;
    }
    return null;
  }

  function removeTag(characterName) {
    if (!(characterName in tags.value)) {
      return;
    }
    jss.removeStyleSheet(tagJss.value[characterName]);
    delete tags.value[characterName];
  }

  function getCharacterNames() {
    return Object.keys(tags.value);
  }

  return {
    setTag,
    getTag,
    getCharacterNames,
    removeTag,
  };
});