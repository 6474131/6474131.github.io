// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";
import { FirebaseImage } from "@/js/firebase_objects/image-object";

export const useImageStore = defineStore('images', {
  state:   () => ({
    /** @type FirebaseImage[] */
    images: useLocalStorage("capImages", [], {
      serializer: {
        /**
         * @param value
         * @returns {FirebaseImage[]}
         */
        read: (value) => {
          if (value === null || value.trim().length === 0) {
            return [];
          }
          const imageArray = JSON.parse(value);
          return imageArray.map((image) => {
            return new FirebaseImage(
              image.path, image.hash, image.sourceUid, image.contentType,
              image.url,
            );
          });
        },
        /**
         * @param {FirebaseImage[]} value
         */
        write: (value) => {
          return JSON.stringify(value);
        },
      },
    }),
  }),
  actions: {
    /**
     * @param {FirebaseImage} newImage
     */
    addImage(newImage) {
      this.images.push(newImage);
    },
    /**
     * @param {number} index
     */
    removeImage(index) {
      this.images.splice(index, 1);
    },
    /**
     * @param {number} index
     * @returns FirebaseImage | null
     */
    getImage(index) {
      if (index < this.images.length) {
        return this.images[index];
      }
      return null;
    },
  },
});