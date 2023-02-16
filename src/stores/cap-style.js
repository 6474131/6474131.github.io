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

export const useCapStyleStore = defineStore('capStyle', () => {
  const tags = ref({});

  const tagsInStorage = localStorage.getItem('bodyTags');
  if (tagsInStorage) {
    const oldTags = JSON.parse(tagsInStorage);
    for (const tag of oldTags.array) {
      for (const [key, value] of Object.entries(tag)) {
        _setTag(key, value);

      }
    }
  }
  else {
    const newContainerSheet = jss.createStyleSheet(
      {'capContainer': {}},
    );
    newContainerSheet.attach();
    tags.value['capContainer'] = new Tag(newContainerSheet, {});

    const newSheet = jss.createStyleSheet(
      {'capImg': {}},
    );
    newSheet.attach();
    tags.value['capImg'] = new Tag(newSheet, {});
  }

  watch(() => tags.value, (state) => {
    localStorage.setItem('bodyTags', JSON.stringify(getAllJson()));
  }, {deep: true});
  function _setTag(characterName, cssObj) {
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

  function getAllJson() {
    const jsonArray = [];
    for (const [key, value] of Object.entries(tags.value)) {
      jsonArray.push({[key]: value.json});

    }
    return {array: jsonArray};
  }


  function setTextStyle(cssObj) {
    const characterName = 'capContainer';
    let oldJson         = {};
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

  function getTextStyle() {
    return tags.value['capContainer'].json;
  }

  function setImgStyle(cssObj) {
    const characterName = 'capImg';
    jss.removeStyleSheet(tags.value[characterName].jss);
    delete tags.value[characterName].jss;

    const newSheet = jss.createStyleSheet(
      {capContainer: cssObj},
    );
    newSheet.attach();
    tags.value[characterName] = new Tag(newSheet, cssObj);

  }

  function getImgStyle() {
    return tags.value['capImg'].json;
  }

  return {setImgStyle, setTextStyle, getImgStyle, getTextStyle};
});
