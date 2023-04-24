// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";

export const useFaqStore = defineStore('faq', {
  state: () => ({
    /** @type boolean */
    closed: useLocalStorage('faq-closed-v1', false),
  }),
});
