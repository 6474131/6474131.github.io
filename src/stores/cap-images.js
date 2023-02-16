import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useImageStore = defineStore('images', () => {
  const images = ref([]);

  const imageInStorage = localStorage.getItem('capImages');
  if (imageInStorage) {
    images.value = JSON.parse(imageInStorage);
  }

  watch(() => images.value, (state) => {
    localStorage.setItem('capImages', JSON.stringify(state));
  }, {deep: true});

  function addImage(imgSrc) {
    images.value.push(imgSrc);

  }

  function removeImage(index) {
    images.value.splice(index, 1);
  }

  function getImage(imgNumber) {
    if (imgNumber < images.value.length) {
      return images.value[imgNumber];

    }
    return null;
  }

  function getImages() {
    return images.value;
  }

  return {getImage, getImages, addImage, removeImage};
});
