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
    for (const sheetName of ['capContainer', 'capText', 'capImg', 'capBreak']) {
      const newSheet = jss.createStyleSheet(
        {[sheetName]: {}},
      );
      newSheet.attach();
      tags.value[sheetName] = new Tag(newSheet, {});

    }
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
    _setTag(characterName, cssObj);

  }

  function getTextStyle() {
    return tags.value['capContainer'].json;
  }

  function setCapTextStyle(cssObj) {
    const characterName = 'capText';
    _setTag(characterName, cssObj);

  }

  function getCapTextStyle() {
    return tags.value['capText'].json;
  }

  function setCapImgStyle(cssObj) {
    const characterName = 'capImg';
    _setTag(characterName, cssObj);

  }

  function getCapImgStyle() {
    return tags.value['capImg'].json;
  }

  function setCapBreakStyle(cssObj) {
    const characterName = 'capBreak';
    _setTag(characterName, cssObj);

  }

  function getCapBreakStyle() {
    return tags.value['capBreak'].json;
  }

  function listFonts() {
    let {fonts} = document;
    const it    = fonts.entries();

    let arr  = [];
    let done = false;

    while (!done) {
      const font = it.next();
      if (!font.done) {
        arr.push(font.value[0].family);
      }
      else {
        done = font.done;
      }
    }

    const newSet = new Set(arr);
    // manually remove if it's here
    newSet.delete('bootstrap-icons');
    // converted to set then arr to filter repetitive values
    return [...newSet];
  }

  return {
    setTextStyle,
    getTextStyle,
    setCapTextStyle,
    getCapTextStyle,
    setCapImgStyle,
    getCapImgStyle,
    setCapBreakStyle,
    getCapBreakStyle,
    listFonts,
  };
});