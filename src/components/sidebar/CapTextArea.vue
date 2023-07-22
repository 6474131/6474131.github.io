<template>
  <div>
    <template v-if="editorReady">
      <!--            Quoted correctly: {{ quotedCorrectlyBool }}-->
<!--      {{ capTextStore.rawDelta }}-->
    </template>
    <div>
      <div class="btn-toolbar justify-content-between" role="toolbar">
        <div class="btn-group me-2" role="group">
          <BoldButton :editor-ready="editorReady" :quill="quill"/>
          <ItalicButton :editor-ready="editorReady" :quill="quill"/>
          <TextColorButton :editor-ready="editorReady" :quill="quill"/>
          <SizeButton :editor-ready="editorReady" :quill="quill"/>
          <AlignmentButton :editor-ready="editorReady" :quill="quill"/>
          <LineHeightButton :editor-ready="editorReady" :quill="quill"/>
          <ParagraphHeightButton :editor-ready="editorReady" :quill="quill"/>
          <ClearFormatButton :editor-ready="editorReady" :quill="quill"/>
        </div>
        <div class="btn-group me-2" role="group">
          <ImageButton :editor-ready="editorReady" :quill="quill"/>
          <CharacterSettingsButton/>
          <CharacterButton :editor-ready="editorReady" :quill="quill"/>
        </div>
        <div class="btn-group me-2" role="group">
          <FAQButton/>
          <SettingsButton/>
        </div>
        <div class="btn-group" role="group">
          <CapEditButton @click="onEditClick"/>
        </div>

      </div>
    </div>
    <QuillEditor
      id="qEditor"
      ref="qEditor"
      theme=""
      @ready="ready"/>

  </div>
</template>

<script>
import { useCapTextStore } from "@/stores/cap-text";
import { useCapSettingsStore } from "@/stores/cap-settings";
import { useCapStyleStore } from "@/stores/cap-style";
import { Quill, QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BoldButton from "@/components/editor_buttons/BoldButton.vue";
import ItalicButton from "@/components/editor_buttons/ItalicButton.vue";
import CharacterButton from "@/components/editor_buttons/CharacterFormatButton.vue";
import SizeButton from "@/components/editor_buttons/SizeButton.vue";
import AlignmentButton from "@/components/editor_buttons/AlignmentButton.vue";
import { TagBlot } from "@/js/tag";
import ImageButton from "@/components/editor_buttons/ImageButton.vue";
import TranscriptButton from "@/components/editor_buttons/TranscriptButton.vue";
import DownloadButton from "@/components/editor_buttons/DownloadButton.vue";
import BackgroundColorButton from "@/components/editor_buttons/BackgroundColorButton.vue";
import TextColorButton from "@/components/editor_buttons/TextColorButton.vue";
import LineHeightButton from "@/components/editor_buttons/LineHeightButton.vue";
import { LineHeightStyle } from "@/js/line-height";
import ClearFormatButton from "@/components/editor_buttons/ClearFormatButton.vue";
import { ParagraphHeightStyle } from "@/js/paragraph-height";
import ParagraphHeightButton from "@/components/editor_buttons/ParagraphHeightButton.vue";
import { CustomImage } from "@/js/custom-image";
import { useImageStore } from "@/stores/cap-images";
import { QUOTE_CHARACTERS } from "@/js/global";
import FAQButton from "@/components/editor_buttons/FAQButton.vue";
import SettingsButton from "@/components/editor_buttons/SettingsButton.vue";
import CharacterSettingsButton from "@/components/editor_buttons/CharacterSettingsButton.vue";
import CapEditButton from "@/components/editor_buttons/CapEditButton.vue";

export default {
  name:       "CapTextArea",
  components: {
    CapEditButton,
    CharacterSettingsButton,
    SettingsButton,
    FAQButton,
    ParagraphHeightButton,
    ClearFormatButton,
    LineHeightButton,
    TextColorButton,
    BackgroundColorButton,
    DownloadButton,
    TranscriptButton,
    ImageButton,
    AlignmentButton,
    SizeButton,
    CharacterButton,
    ItalicButton,
    BoldButton,
    QuillEditor,
  },
  data() {
    return {
      capTextStore:        useCapTextStore(),
      capSettingsStore:    useCapSettingsStore(),
      capStyleStore:       useCapStyleStore(),
      capImageStore:       useImageStore(),
      editorReady:         false,
      quotedCorrectlyBool: false,
    };
  },
  created() {
    // needs to be done here or else things don't load correctly
    // can't put it in individual modules without having issues
    Quill.register('blots/tag-module', TagBlot);
    const Size      = Quill.import('attributors/style/size');
    const sizeArray = [];
    for (let i = 1; i < 101; i++) {
      sizeArray.push(`${i}px`);
    }
    Size.whitelist = sizeArray;
    Quill.register(Size, true);
    Quill.register(LineHeightStyle, true);
    Quill.register(ParagraphHeightStyle, true);
    Quill.register(CustomImage, true);

    const BlockBlot = Quill.import('blots/block');

    class CustomBlockBlot extends BlockBlot {
      static create(value) {
        const node = super.create(value);
        node.setAttribute('class', 'capText');

        return node;
      }
    }

    Quill.register('formats/block', CustomBlockBlot);

  },
  computed: {
    /**
     * @returns {Quill|null}
     */
    quill() {
      if (!this.editorReady) {
        return null;
      }
      return this.$refs.qEditor.getQuill();
    },
  },
  methods:  {
    async ready() {
      for (const image of this.capImageStore.images) {
        await image.generateBlobUrl();
        for (const op of this.capTextStore.rawDelta.ops) {
          if (op.insert.customimage != null) {
            const hash                = op.insert.customimage.hash;
            op.insert.customimage.url = this.capImageStore.getImageFromHash(hash).url;
          }
        }
      }
      this.$refs.qEditor.getQuill().setContents(this.capTextStore.rawDelta, 'api');
      this.editorReady = true;

      this.editorChange();
      this.$refs.qEditor.getQuill()
          .on('editor-change', this.editorChange);

      this.$refs.qEditor.getQuill().history.clear();
    },
    editorChange() {
      this.capTextStore.rawDelta = this.$refs.qEditor.getContents();
      // should probably be refactored, but basically this is necessary because the default quill getText purposefully
      // does not account for embeds... something that matters when doing regex on the string
      this.capTextStore.rawText =
        this.capTextStore.rawDelta.filter(op => (typeof op.insert === 'string') || op.insert.customimage != null)
            .map(op => {
              if (op.insert.customimage != null) {
                return " ";
              }
              return op.insert;
            })
            .join('');

      this.quotedCorrectlyBool = this.quotedCorrectly();

    },
    onEditClick() {
      this.capTextStore.rawHTML = this.$refs.qEditor.getHTML();
      this.capTextStore.splitText();

    },
    quotedCorrectly() {
      const filterResult = this.capTextStore.rawDelta
                               .filter(
                                 op => (typeof op.insert === 'string'))
                               .map(op => {
                                 if (!op.attributes && op.insert !== "\n") {
                                   const quoteCheck = op.insert.match(
                                     new RegExp(`${QUOTE_CHARACTERS}`));
                                   if (quoteCheck) {
                                     return op.insert;
                                   }
                                   return null;
                                 }
                               })
                               .filter(thing => thing != null);
      return filterResult.length === 0;
    },
  },
};
</script>

<style>
.ql-clipboard {
  left: -100000px;
  height: 1px;
  overflow-y: hidden;
  position: absolute;
  top: 50%;
}

.ql-editor {
  box-sizing: border-box;
  line-height: 1.42;
  height: 100%;
  outline: none;
  overflow-y: auto;
  padding: 12px 15px;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.ql-editor p {
  text-align: left;
}

.ql-container {
  border: 1px solid white;
  font-size: 16px;
}

.ql-container img {
  max-width: 100%;
  text-align: center;
}

</style>