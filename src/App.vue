<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-1">
                <Sidebar class="mt-3"/>
            </div>
            <div class="border col text-center m-3 px-0">
                <h2>Cap Preview</h2>
                <div
                        id="capContainer" class="capContainer"
                        style="word-break: break-word">
                    <div class="w-100" v-html="capTextStore.rawHTML"></div>
                </div>
            </div>
        </div>
    </div>
    <FaqModal/>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import { useCapTextStore } from "@/stores/cap-text";
import FaqModal from "@/components/FaqModal.vue";
import html2canvas from "html2canvas";
import { useCapSettingsStore } from "@/stores/cap-settings";
import { useCapStyleStore } from "@/stores/cap-style";

export default {
  name:       "CapMaker",
  components: {
    FaqModal,
    Sidebar,
  },
  data() {
    return {
      capTextStore:     useCapTextStore(),
      capSettingsStore: useCapSettingsStore(),
      capStyleStore:    useCapStyleStore(),
      intervalTimer:    null,
    };
  },
  methods: {
    async preview() {
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
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Lobster+Two&family=Roboto&family=Tinos&display=swap');

img {
    width: 100%;
}

#capContainer.p {
    margin-bottom: 0 !important;
    /*needed to fix some weird kerning bug on mobile*/
    letter-spacing: 0.01px;
}

</style>
