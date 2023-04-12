// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";

const baseKey = 'caption-settings-';

export const useCapSettingsStore = defineStore('capSettings', {
  state: () => ({
    /** @type number */
    width: useLocalStorage(baseKey + 'width', 0),
    /** @type boolean */
    useGivenWidth: useLocalStorage(baseKey + 'use-given-width', false),
  }),
});
