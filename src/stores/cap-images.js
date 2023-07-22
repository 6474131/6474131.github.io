// noinspection JSValidateTypes

import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";
import { FirebaseImage } from "@/js/firebase_objects/image-object";
import { ref } from "vue";

export const useImageStore = defineStore('images', () => {
  /**
   *
   * @type {FirebaseImage[]}
   */
  const _firebaseImages = useLocalStorage("capImages", [], {
    serializer: {
      /**
       * @param value
       * @returns {FirebaseImage[]}
       */
      read: (value) => {
        if (value === null || value.trim().length === 0) {
          return [];
        }
        /** @type {FirebaseImage[]} */
        const imageArray  = JSON.parse(value);
        const returnArray = [];
        for (const image of imageArray) {
          const firebaseImage       = new FirebaseImage();
          firebaseImage.hash        = image.hash;
          firebaseImage.contentType = image.contentType;
          firebaseImage.url         = image.url;

          returnArray.push(firebaseImage);
        }
        return returnArray;
      },
      /**
       * @param {FirebaseImage[]} value
       */
      write: (value) => {
        return JSON.stringify(value);
      },
    },
  });
  const images          = ref(_firebaseImages);

  /**
   * @param {FirebaseImage} newImage
   */
  function addImage(newImage) {
    console.log(`CURRENT URL: ${newImage.url}`);
    images.value.push(newImage);
  }

  /**
   * @param {number} index
   * @returns {Promise<FirebaseImage | null>}
   */
  async function removeImage(index) {
    if (index >= images.value.length) {
      return null;
    }
    console.log(`INDEX: ${index}`);
    const image = getImage(index);
    images.value.splice(index, 1);
    await image.delete();
    return image;
  }

  /**
   * @param {number} index
   * @returns FirebaseImage | null
   */
  function getImage(index) {
    if (index < images.value.length) {
      return images.value[index];
    }
    return null;
  }

  /**
   * @param {string} hash
   * @returns FirebaseImage | null
   */
  function getImageFromHash(hash) {
    for (const image of images.value) {
      if (image.hash === hash) {
        return image;
      }
    }
    return null;
  }

  return {
    images,
    addImage,
    removeImage,
    getImage,
    getImageFromHash,
  };
});