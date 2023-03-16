import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

class CapSettings {
  width;
  useGivenWidth;

  constructor() {
    this.width         = 0;
    this.useGivenWidth = false;
  }
}

export const useCapSettingsStore = defineStore('capSettings', () => {
  const settingsObj       = new CapSettings();
  const settings          = ref(settingsObj);
  const settingsInStorage = localStorage.getItem('captionSettings');
  if (settingsInStorage) {
    settings.value =
      Object.assign(CapSettings.prototype, JSON.parse(settingsInStorage));
  }

  watch(() => settings.value, (state) => {
    localStorage.setItem('captionSettings', JSON.stringify(state));
  }, {deep: true});
  return {settings};
});
