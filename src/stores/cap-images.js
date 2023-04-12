// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";

export const useImageStore = defineStore('images', {
  state:   () => ({
    /** @type string[] */
    images: useLocalStorage('capImages', []),
  }),
  actions: {
    addImage(newImage) {
      this.images.push(newImage);
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    getImage(index) {
      if (index < this.images.length) {
        return this.images[index];
      }
      return null;
    },
  },
});