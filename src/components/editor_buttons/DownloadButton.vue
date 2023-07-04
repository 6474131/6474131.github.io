<template>
  <template v-if="progress == null">
    <button
      v-tooltip
      class="bi bi-download btn btn-outline-info"
      title="Download Cap"
      @click="downloadCap"> Download Cap
    </button>
  </template>
  <template v-else>
    <button class="btn btn-outline-primary" type="button"><span
      class="spinner-border spinner-border-sm"
      role="status"></span> {{ Math.floor(progress * 100) }}%
    </button>
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
      this.progress    = 0;
      const container  = document.getElementById("capContainer");
      const images     = container.querySelectorAll("img");
      let maxSizeTuple = {
        naturalWidth: 0,
        clientWidth:  0,
      };
      let gifImage     = null;
      images.forEach((image) => {
        if (image.naturalWidth > maxSizeTuple.naturalWidth) {
          const computedImageStyle = getComputedStyle(image);
          const calcClientWidth    = image.clientWidth - parseInt(computedImageStyle.getPropertyValue(
            'padding-left')) - parseInt(computedImageStyle.getPropertyValue('padding-right'));
          maxSizeTuple             = {
            naturalWidth: image.naturalWidth,
            clientWidth:  calcClientWidth,
          };
          // check if the current image is a gif
          for (const storeImage of this.capImageStore.images) {
            if (image.src === storeImage.url && storeImage.contentType === 'image/gif') {
              gifImage = image;
            }
          }
        }
      });
      const ratio = this.capSettingsStore.downloadAsIs ? 1 : maxSizeTuple.naturalWidth / maxSizeTuple.clientWidth;
      console.log(`RATIO: ${ratio}`);

      const imageType = this.capImageStore.getImage(0).contentType;

      const html2canvasOptions = {
        backgroundColor: this.capStyleStore.getTextStyle()['background-color'] ?? "#212529",
        allowTaint:      false,
        useCORS:         true,
        scrollX:         0,
        scrollY:         -window.scrollY,
        scale:           ratio,
        // scale: 1
      };
      if (gifImage != null) {
        html2canvas(container, html2canvasOptions)
          .then((canvas) => {
            recordGif(canvas, getGifSettings(gifImage, container, ratio), gifImage.src, (progress) => {
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