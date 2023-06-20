<template>
  <template v-if="progress == null">
    <button
      v-tooltip
      class="bi-download btn btn-outline-primary"
      title="Download Cap"
      @click="downloadCap"></button>
  </template>
  <template v-else>
    <button class="btn btn-outline-primary" type="button"><span
      class="spinner-border spinner-border-sm"
      role="status"></span></button>
  </template>
</template>

<script>
import { getGifSettings, recordGif } from "@/js/gif-canvas";
import html2canvas from "html2canvas";
import { useCapTextStore } from "@/stores/cap-text";
import { useCharacterTagsStore } from "@/stores/character-tags";
import { useCapStyleStore } from "@/stores/cap-style";
import { useImageStore } from "@/stores/cap-images";
import { useCapSettingsStore } from "@/stores/cap-settings";

export default {
  name:  "DownloadButton",
  props: {
    quill:       {
      default:  null,
      required: true,
    },
    editorReady: {
      default:  false,
      required: true,
    },
  },
  data() {
    return {
      capTextStore:       useCapTextStore(),
      characterTagsStore: useCharacterTagsStore(),
      capStyleStore:      useCapStyleStore(),
      capImageStore:      useImageStore(),
      capSettingsStore:   useCapSettingsStore(),
      progress:           null,
    };
  },
  methods: {
    saveAs(uri, filename) {
      let link = document.createElement('a');
      if (typeof link.download === 'string') {
        link.href     = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
      }
      else {
        window.open(uri);
      }
    },
    downloadCap() {
      this.progress   = 0.01;
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
      console.log("THIS IS THE MAX SIZE: " + maxSize);

      const imageType = this.capImageStore.getImage(0).contentType;
      console.log("IMAGE TYPE: " + imageType);

      const html2canvasOptions = {
        backgroundColor: this.capStyleStore.getTextStyle()['background-color'] ?? "#212529",
        allowTaint:      false,
        useCORS:         true,
        scrollX:         0,
        scrollY:         -window.scrollY,
        scale:           1,
      };
      if (imageType === 'image/gif' || imageType === 'octet-stream') {

        let gifSettings;
        html2canvasOptions.onclone = (_, element) => {
          element.style.width = `${maxSize}px`;

          // need to get the width/height position of the image in the container, since it may not be the same as outside the container
          const img   = element.querySelectorAll("img")[0];
          gifSettings = getGifSettings(img, element);
        };

        html2canvas(container, html2canvasOptions)
          .then((canvas) => {
            recordGif(canvas, gifSettings, (progress) => {
              console.log("PROGRESS " + progress);
              if (progress > 0) {
                this.progress = progress;
              }
              if (progress === 1) {
                this.progress = null;
              }
            });

          });

      }
      else {
        html2canvasOptions.onclone = (_, element) => {
          element.style.width = `${maxSize}px`;
        };

        html2canvas(container, html2canvasOptions)
          .then((canvas) => {
            this.saveAs(canvas.toDataURL(), 'cap.png');
            this.progress = null;
          });
      }

    },
  },
};
</script>

<style scoped>

</style>