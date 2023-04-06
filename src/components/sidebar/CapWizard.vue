<template>
  <div class="badge rounded-pill mb-2"
       :class="[capText.checkQuotes().length > 0 ? 'bg-danger text-bg-danger' : 'bg-success text-bg-success']">Double
    quotes
  </div>
  <div v-if="capText.checkQuotes().length > 0">
    <div class="mb-3" v-for="line in capText.checkQuotes().slice(0,4)">Double quote error at: {{
        line.slice(0, 40)
      }}
    </div>
  </div>
  <hr>
  <div class="badge rounded-pill mb-2"
       :class="[capText.checkNoTag().length > 0 ? 'bg-danger text-bg-danger' : 'bg-success text-bg-success']">Untagged
    Dialogue
  </div>
  <!--Slice is so that user only sees a few at a time  -->
  <template v-for="match in capText.checkNoTag().slice(0,5)">
    No tag at: {{ match[0] }}
    <div class="input-group mb-3">
      <label for="" class="input-group-text">Select character:</label>
      <select class="form-select"
              @change="(e) => {capText.addTagAtPosition(e.target.value, match.index);e.target.value = null;}">
        <option disabled selected>Select character...</option>
        <option v-for="name in characterStore.getCharacterNames()" :value="name">{{ name }}</option>
      </select>
    </div>
  </template>
  <template v-if="capText._rawText.length === 0">
    <hr>
    <div class="text-danger">Add caption text <a class="link-info" data-bs-toggle="offcanvas"
                                                 href="#offcanvasText">here</a></div>
  </template>
  <template v-if="characterStore.getCharacterNames().length === 0">
    <hr>
    <div class="text-danger">Add characters <a class="link-info" data-bs-toggle="offcanvas"
                                               href="#offcanvasCharacters">here</a></div>
  </template>
  <template v-if="imageStore.getImages().length === 0">
    <hr>
    <div class="text-danger">Add images <a class="link-info" data-bs-toggle="offcanvas" href="#offcanvasImages">here</a>
    </div>
  </template>
  <hr>
  <form class="container-fluid">
    <div class="form-check form-switch mb-3">
      <label class="form-check-label" for="useWidth">Do you want to use a given width?
      </label>
      <input class="form-check-input" type="checkbox" role="switch" id="useWidth"
             v-model="capSettingsStore.settings.useGivenWidth">
    </div>
    <div class="row input-group mb-3" v-if="capSettingsStore.settings.useGivenWidth">
      <label class="input-group-text col-auto" for="capWidth">Character Font Size</label>
      <input type="number" id="capWidth" class="form-control col-sm-1" placeholder="Size here..."
             @input="(e) => capSettingsStore.settings.width = parseInt(e.target.value)"
             :value="capSettingsStore.settings.width">
      <label class="input-group-text col-auto" for="characterFontSize">px</label>
    </div>
  </form>
  <button type="button" class="btn btn-primary mb-3" @click="downloadCap">Download cap</button>
  <br>
  <div class="form-check form-switch mb-3">
    <label class="form-check-label" for="transcriptReddit">Do you want a transcript for
      reddit?
    </label>
    <input class="form-check-input" type="checkbox" role="switch" id="transcriptReddit"
           v-model="redditTranscript">
  </div>
  <button type="button" class="btn btn-secondary mb-3" @click="copyTranscript">Get Transcript</button>
  <br>
  <button type="button" class="btn btn-danger mb-3" @click="clearCache()">Clear Cache</button>
</template>

<script>
import { useCapTextStore } from "@/stores/cap-text";
import { useCharacterTagsStore } from "@/stores/character-tags";
import { useCapStyleStore } from "@/stores/cap-style";
import { useImageStore } from "@/stores/cap-images";
import html2canvas from "html2canvas";
import { useCapSettingsStore } from "@/stores/cap-settings";
import { parseGIF, decompressFrames } from "gifuct-js";
import { CanvasCapture } from "canvas-capture";

export default {
  name: "CapWizard",
  data() {
    return {
      capText:          useCapTextStore(),
      characterStore:   useCharacterTagsStore(),
      redditTranscript: true,
      capStyle:         useCapStyleStore(),
      imageStore:       useImageStore(),
      capSettingsStore: useCapSettingsStore(),
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
    recordGif(canvas, frames, gifSettings) {
      let tempCanvas = document.createElement('canvas');
      let tempCtx    = tempCanvas.getContext('2d');

      CanvasCapture.init(canvas);
      CanvasCapture.beginGIFRecord({
                                     // onError:          () => console.log("ERROR!"),
                                     onExportProgress: (index) => {
                                       console.log("PROGRESS " + index);
                                     },
                                     fps:              1000 / frames[0].delay,
                                   });
      let context = canvas.getContext('2d');
      let counter = 0;

      function render() {
        if (counter >= frames.length) {
          CanvasCapture.stopRecord();
          return;
        }
        const frame       = frames[counter];
        let imageData     = new ImageData(frame.patch, frame.dims.width, frame.dims.height);
        tempCanvas.width  = frame.dims.width;
        tempCanvas.height = frame.dims.height;
        tempCtx.resetTransform();
        tempCtx.putImageData(imageData, 0, 0, 0, 0, frame.dims.width, frame.dims.height);

        context.resetTransform();

        context.drawImage(tempCanvas, gifSettings.left, gifSettings.top, gifSettings.width, gifSettings.height);

        CanvasCapture.recordFrame();
        counter++;

        requestAnimationFrame(render);
      }

      render();
    },
    getGifSettings(element, parent) {
      const innerBox = element.getBoundingClientRect();
      const outerBox = parent.getBoundingClientRect();
      const top      = innerBox.top - outerBox.top;
      const left     = innerBox.left - outerBox.left;

      return {top: top, left: left, width: element.width, height: element.height};
    },
    imageTypeFromDataUri(dataUri) {
      return dataUri.substring(dataUri.indexOf('/') + 1, dataUri.indexOf(';base64'));
    },
    async downloadCap() {
      const images = document.querySelectorAll("img");
      let maxSize  = 0;
      if (this.capSettingsStore.settings.useGivenWidth) {
        maxSize = this.capSettingsStore.settings.width;
      }
      else {
        images.forEach((image) => {
          if (image.naturalWidth > maxSize) {
            maxSize = image.naturalWidth;
          }
        });
      }
      console.log("THIS IS THE MAX SIZE: " + maxSize);

      const imageType = this.imageTypeFromDataUri(this.imageStore.getImage(0));
      console.log("IMAGE TYPE: " + imageType);

      const html2canvasOptions = {
        backgroundColor: this.capStyle.getTextStyle()['background-color'] ?? "#212529",
        allowTaint:      false,
        scrollX:         0,
        scrollY:         -window.scrollY,
        scale:           1,
      };
      const container          = document.getElementById("capContainer");
      if (imageType === 'gif' || imageType === 'octet-stream') {
        const resp   = await fetch(this.imageStore.getImage(0));
        const buffer = await resp.arrayBuffer();
        const gif    = parseGIF(buffer);
        const frames = decompressFrames(gif, true);

        let gifSettings;
        html2canvasOptions.onclone = (_, element) => {
          element.style.width = `${maxSize}px`;

          // need to get the width/height position of the image in the container, since it may not be the same as outside the container
          const img   = element.querySelectorAll("img")[0];
          gifSettings = this.getGifSettings(img, element);
        };

        const canvas = await html2canvas(container, html2canvasOptions);
        this.recordGif(canvas, frames, gifSettings);

      }
      else {
        html2canvasOptions.onclone = (_, element) => {
          element.style.width = `${maxSize}px`;
        };

        const canvas = await html2canvas(container, html2canvasOptions);
        this.saveAs(canvas.toDataURL(), 'cap.png');
      }

    },
    copyTranscript() {
      let text = document.getElementById("capContainer").innerText.trim();
      // adjusted for markdown
      if (this.redditTranscript) {
        text = text.replaceAll(/^\s*?>/gm, '\\>');
        text = text.replaceAll(/\n+/g, '\n\n');
      }
      console.log("TEXT: " + text);
      navigator.clipboard.writeText(text);
      alert("Copied the cap text.");
    },
    clearCache() {
      localStorage.clear();
      location.reload();
    },

  },
};
</script>

<style scoped>

</style>