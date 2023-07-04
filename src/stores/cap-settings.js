// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";

const baseKey = 'caption-settings-';

export const useCapSettingsStore = defineStore('capSettings', {
  state: () => ({
    /** @type boolean */
    useGivenWidth: useLocalStorage(baseKey + 'use-given-width', false),
    /** @type number */
    width: useLocalStorage(baseKey + 'width', 0),
    /** @type boolean */
    useGivenHeight: useLocalStorage(baseKey + 'use-given-height', false),
    /** @type number */
    height: useLocalStorage(baseKey + 'height', 0),
    /** @type boolean */
    shrinkCapWidth: false,
    /** @type boolean */
    shrinkCapHeight: false,
    /** @type {"one_col","two_col_img_left", "two_col_img_right", "three_col"} */
    currentTemplate: "one_col",
    /** @type {number} */
    imagePercentage: 30,
    /** @type {boolean} */
    downloadAsIs: false,
  }),
});
