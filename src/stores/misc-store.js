// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";

export const useMiscStore = defineStore('misc', {
  state: () => ({
    /** @type boolean */
    capEditMode: true,
  }),
});
