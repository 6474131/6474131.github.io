<template>
  <div>
    <div class="bg-body">
      <div class="btn-toolbar justify-content-between mb-3" role="toolbar">
        <div class="btn-group me-2" role="group">
          <DownloadButton/>
        </div>
        <div class="btn-group" role="group">
          <CapEditButton/>
        </div>
      </div>
      <MiscToolbar/>

    </div>
    <div class="d-flex justify-content-center overflow-hidden">
      <div :style="{width: capWidth, height: capHeight}"
           id="capContainer" class="capContainer d-flex justify-content-center align-items-center"
           style="word-break: break-word">
        <template v-if="capSettingsStore.currentTemplate === 'one_col'">
          <div v-html="capTextStore.rawHTML"></div>
        </template>
        <template v-if="capSettingsStore.currentTemplate === 'two_col_img_left'">
          <img id="image" :src="capTextStore.middleImage" class="capImg"
               :style="{width: capSettingsStore.imagePercentage + '%'}" alt=""/>
          <div class="h-100 capCol" v-html="capTextStore.noImageHTML"
               style="display:flex; flex: 1; flex-direction: column; justify-content: space-evenly">
          </div>
        </template>
        <template v-if="capSettingsStore.currentTemplate === 'two_col_img_right'">
          <div v-html="capTextStore.noImageHTML"
               class="h-100 capCol"
               style="display:flex; flex: 1; flex-direction: column; justify-content: space-around">
          </div>
          <img id="image" :src="capTextStore.middleImage" class="capImg"
               :style="{width: capSettingsStore.imagePercentage + '%'}" alt=""/>
        </template>
        <template v-if="capSettingsStore.currentTemplate === 'three_col'">
          <div class="capCol" v-html="capTextStore.firstHalf"
               style="display:flex; flex: 1; flex-direction: column; justify-content: space-evenly">
          </div>
          <img id="image" :src="capTextStore.middleImage" class="capImg"
               :style="{width: capSettingsStore.imagePercentage + '%'}" alt=""/>

          <div class="capCol" v-html="capTextStore.secondHalf"
               style="display: flex; flex: 1; height: 100%; flex-direction: column; justify-content: space-evenly">
          </div>
        </template>
      </div>
    </div>
  </div>

</template>

<script>

import { useCapTextStore } from "@/stores/cap-text";
import CapEditButton from "@/components/editor_buttons/CapEditButton.vue";
import DownloadButton from "@/components/editor_buttons/DownloadButton.vue";
import { useCapSettingsStore } from "@/stores/cap-settings";
import { useCapStyleStore } from "@/stores/cap-style";
import MiscToolbar from "@/components/toolbars/MiscToolbar.vue";
import PaddingOptions from "@/components/sidebar/PaddingOptions.vue";
import TemplateOptions from "@/components/sidebar/TemplateOptions.vue";

export default {
  name:       "CapContainer",
  components: {
    TemplateOptions,
    PaddingOptions,
    MiscToolbar,
    DownloadButton,
    CapEditButton,
  },
  computed:   {
    capWidth() {
      if (this.capSettingsStore.shrinkCapWidth) {
        return this.calcShrinkWidth() + 'px';
      }
      if (this.capSettingsStore.useGivenWidth) {
        return this.capSettingsStore.width + 'px';
      }
    },
    capHeight() {
      if (this.capSettingsStore.shrinkCapHeight) {
        return this.calcShrinkHeight() + 'px';
      }
      if (this.capSettingsStore.useGivenHeight) {
        return this.capSettingsStore.height + 'px';
      }

    },
  },
  data() {
    return {
      capTextStore:     useCapTextStore(),
      capSettingsStore: useCapSettingsStore(),
      /** @type {number | null} */
      shrinkWidth:   null,
      capStyleStore: useCapStyleStore(),
    };
  },
  methods: {
    /**
     * @returns {number}
     */
    calcShrinkWidth() {
      const container = document.getElementById("capContainer");
      const images    = container.querySelectorAll("img");
      let maxSize     = 0;
      images.forEach((image) => {
        if (image.naturalWidth > maxSize) {
          // intentionally don't use the size of the image without the padding, otherwise it defeats the point of the padding
          maxSize = image.clientWidth;
        }
      });
      return maxSize;
    },
    /**
     * @returns {number}
     */
    calcShrinkHeight() {
      const container = document.getElementById("capContainer");
      const images    = container.querySelectorAll("img");
      let maxSize     = 0;
      images.forEach((image) => {
        if (image.clientHeight > maxSize) {
          // intentionally don't use the size of the image without the padding, otherwise it defeats the point of the padding
          maxSize = image.clientHeight;
        }
      });
      return maxSize;
    },
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lato&family=Lobster+Two&family=Roboto&family=Tinos&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');

@font-face {
  font-family: Diavlo;
  src: url('src/fonts/Diavlo_LIGHT_II_37.otf');
}

@font-face {
  font-family: 'CC Astro City';
  src: url('src/fonts/ccastro-city.ttf');
}

@font-face {
  font-family: 'CC Wild Words';
  src: url('src/fonts/CC Wild Words Roman.ttf');
}

#capContainer div p {
  text-align: left;
  /*needed to fix some weird kerning bug on mobile*/
  letter-spacing: 0.01px;
}

#capContainer div {
  text-align: center;
//width: 100px;
}

.capImg {
  max-width: 100%;
  height: auto;
//width: auto; //object-fit: contain;
}

.ql-align-right {
  text-align: right !important;
}

.ql-align-center {
  text-align: center !important;
}

</style>