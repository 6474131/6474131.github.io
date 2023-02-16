import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { create } from "jss";

const jss = create().setup({
                             createGenerateId() {
                               return function (rule) {
                                 return rule.key;
                               };
                             },
                           });

class Tag {
  jss;
  json;

  constructor(jss, json) {
    this.jss  = jss;
    this.json = json;
  }
}

export const useCharacterTagsStore = defineStore('characterTags', () => {
  const tags = ref({});

  const tagsInStorage = localStorage.getItem('characterTags');
  if (tagsInStorage) {
    const oldTags = JSON.parse(tagsInStorage);
    for (const tag of oldTags.array) {
      for (const [key, value] of Object.entries(tag)) {
        setTag(key, value);

      }
    }
  }

  watch(() => tags.value, (state) => {
    localStorage.setItem('characterTags', JSON.stringify(getAllJson()));
  }, {deep: true});
 
  function getAllJson() {
    const jsonArray = [];
    for (const [key, value] of Object.entries(tags.value)) {
      jsonArray.push({[key]: value.json});

    }
    return {array: jsonArray};
  }

  function getTag(characterName) {
    const characterTags = tags.value[characterName];
    if (characterTags) {
      return characterTags.json;
    }
    return null;
  }

  function getCharacterNames() {
    return Object.keys(tags.value);
  }

  function setTag(characterName, cssObj) {
    let oldJson = {};
    if (characterName in tags.value) {
      oldJson = tags.value[characterName].json;
      jss.removeStyleSheet(tags.value[characterName].jss);
      delete tags.value[characterName];
    }

    for (const [key, value] of Object.entries(cssObj)) {
      oldJson[key] = value;
    }

    const newSheet = jss.createStyleSheet(
      {[characterName]: oldJson},
    );
    newSheet.attach();
    tags.value[characterName] = new Tag(newSheet, oldJson);
  }

  function removeTag(characterName) {
    if (!(characterName in tags.value)) {
      return;
    }
    jss.removeStyleSheet(tags.value[characterName].jss);
    delete tags.value[characterName];
  }

  return {setTag, getTag, removeTag, getCharacterNames};
});
