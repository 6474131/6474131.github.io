import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useFaqStore = defineStore('faq', () => {
  const closed        = ref(false);
  const boolInStorage = localStorage.getItem('faq');
  if (boolInStorage) {
    closed.value = JSON.parse(boolInStorage);
  }

  watch(() => closed.value, (state) => {
    localStorage.setItem('faq', JSON.stringify(state));
  });
  return {closed};
});
