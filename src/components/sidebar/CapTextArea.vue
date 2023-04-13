<template>
  <div>
    <div class="mb-3">
      Specify an image using: {img} optionally followed by a number to indicate which image number to use (like {img1},
      {img2}).
    </div>
    <div class="mb-3">
      You can also use markdown for italics and bold by doing <i>*italics*</i> and <b>**bold**</b>.
    </div>
    <textarea class="form-control h-50" v-model="capTextStore.rawText"></textarea>
  </div>
</template>

<script>
import { useCapTextStore } from "@/stores/cap-text";
import html2canvas from "html2canvas";
import { useCapSettingsStore } from "@/stores/cap-settings";
import { useCapStyleStore } from "@/stores/cap-style";

export default {
  name: "CapTextArea",
  data() {
    return {
      capTextStore:     useCapTextStore(),
      capSettingsStore: useCapSettingsStore(),
      capStyleStore:    useCapStyleStore(),
    };
  },
  methods: {
    async createPreview() {
      const container = document.getElementById("capContainer");
      const images    = container.querySelectorAll("img");
      let maxSize     = 0;
      if (this.capSettingsStore.useGivenWidth) {
        maxSize = this.capSettingsStore.width;
      }
      else {
        images.forEach((image) => {
          if (image.naturalWidth > maxSize) {
            maxSize = image.naturalWidth;
          }
        });
      }

      const html2canvasOptions   = {
        backgroundColor: this.capStyleStore.getTextStyle()['background-color'] ?? "#212529",
        allowTaint:      false,
        scrollX:         0,
        scrollY:         -window.scrollY,
        scale:           1,
      };
      html2canvasOptions.onclone = (_, element) => {
        element.style.width = `${maxSize}px`;
      };

      const canvas = await html2canvas(container, html2canvasOptions);
      const div    = document.getElementById("capCanvasPreview");
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      // canvas.width = 100;
      canvas.style.width = "100%";
      div.append(canvas);

    },
  },
};
</script>

<style scoped>

</style>