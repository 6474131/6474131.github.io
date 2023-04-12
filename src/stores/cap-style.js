import { defineStore } from 'pinia';
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { create } from "jss";

const jss = create().setup({
                             createGenerateId() {
                               return function (rule) {
                                 return rule.key;
                               };
                             },
                           });

export const useCapStyleStore = defineStore('capStyle', () => {
  const styleJss = ref({});

  const capStyles = {
    'capContainer': {},
    'capText':      {},
    'capImg':       {},
    'capBreak':     {},
  };
  const styles    = ref(useLocalStorage('capStyle', capStyles));

  for (const [styleName, styleCssJson] of Object.entries(styles.value)) {
    setStyle(styleName, styleCssJson)

  }

  function setStyle(styleName, cssJson) {
    let oldCssJson = {};
    if (styleName in styleJss.value) {
      oldCssJson = styles.value[styleName];
    }

    // overwrite the old JSON with the new values
    for (const [key, value] of Object.entries(cssJson)) {
      oldCssJson[key] = value;
    }
    styles.value[styleName] = oldCssJson;

    if (styleName in styleJss.value) {
      jss.removeStyleSheet(styleJss.value[styleName]);
    }
    const newSheet = jss.createStyleSheet({[styleName]: oldCssJson});
    newSheet.attach();
    styleJss.value[styleName] = newSheet;
  }

  function getStyle(styleName) {
    const styleJson = styles.value[styleName];
    if (styleJson) {
      return styleJson;
    }
    return null;
  }

  function setTextStyle(cssObj) {
    const characterName = 'capContainer';
    setStyle(characterName, cssObj);
  }

  function getTextStyle() {
    return getStyle('capContainer');
  }

  function setCapTextStyle(cssObj) {
    const characterName = 'capText';
    setStyle(characterName, cssObj);

  }

  function getCapTextStyle() {
    return getStyle('capText');
  }

  function setCapImgStyle(cssObj) {
    const characterName = 'capImg';
    setStyle(characterName, cssObj);

  }

  function getCapImgStyle() {
    return getStyle('capImg');
  }

  function setCapBreakStyle(cssObj) {
    const characterName = 'capBreak';
    setStyle(characterName, cssObj);

  }

  function getCapBreakStyle() {
    return getStyle('capBreak');
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