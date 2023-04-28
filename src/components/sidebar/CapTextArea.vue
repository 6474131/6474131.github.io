<template>
    <div>
        <div>
            <div class="btn-toolbar" role="toolbar">
                <div class="btn-group me-2" role="group">
                    <BoldButton :editor-ready="editorReady" :quill="quill"/>
                    <ItalicButton :editor-ready="editorReady" :quill="quill"/>
                    <TextColorButton :editor-ready="editorReady" :quill="quill"/>
                    <SizeButton :editor-ready="editorReady" :quill="quill"/>
                    <AlignmentButton :editor-ready="editorReady" :quill="quill"/>
                    <LineHeightButton :editor-ready="editorReady" :quill="quill"/>
                    <ParagraphHeightButton :editor-ready="editorReady" :quill="quill"/>
                    <BackgroundColorButton/>
                </div>
                <div class="btn-group me-2" role="group">
                    <CharacterButton :editor-ready="editorReady" :quill="quill"/>
                    <ImageButton :editor-ready="editorReady" :quill="quill"/>
                    <TranscriptButton/>
                    <DownloadButton :editor-ready="editorReady" :quill="quill" @click="updateHTML"/>
                </div>
                <div class="btn-group me-2" role="group">
                    <ClearFormatButton :editor-ready="editorReady" :quill="quill"/>
                </div>

            </div>
        </div>
        <QuillEditor
                id="qEditor"
                ref="qEditor"
                theme=""
                @ready="ready"/>

        <template v-if="editorReady">
            <!--      {{ capTextStore.rawDelta }}-->
        </template>

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
import CharacterButton from "@/components/editor_buttons/CharacterButton.vue";
import SizeButton from "@/components/editor_buttons/SizeButton.vue";
import AlignmentButton from "@/components/editor_buttons/AlignmentButton.vue";
import { TagBlot } from "@/js/tag";
import { SizeStyle } from "@/js/size";
import { AlignmentStyle } from "@/js/alignment";
import ImageButton from "@/components/editor_buttons/ImageButton.vue";
import TranscriptButton from "@/components/editor_buttons/TranscriptButton.vue";
import DownloadButton from "@/components/editor_buttons/DownloadButton.vue";
import BackgroundColorButton from "@/components/editor_buttons/BackgroundColorButton.vue";
import TextColorButton from "@/components/editor_buttons/TextColorButton.vue";
import LineHeightButton from "@/components/editor_buttons/LineHeightButton.vue";
import { LineHeightStyle } from "@/js/line-height";
import { TextColorStyle } from "@/js/text-color";
import ClearFormatButton from "@/components/editor_buttons/ClearFormatButton.vue";
import { ParagraphHeightStyle } from "@/js/paragraph-height";
import ParagraphHeightButton from "@/components/editor_buttons/ParagraphHeightButton.vue";
import { CustomImage, updateImageSrc } from "@/js/custom-image";
import { useImageStore } from "@/stores/cap-images";

export default {
  name:       "CapTextArea",
  components: {
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
      capTextStore:     useCapTextStore(),
      capSettingsStore: useCapSettingsStore(),
      capStyleStore:    useCapStyleStore(),
      capImageStore:    useImageStore(),
      editorReady:      false,
      setImageTimer:    null,
    };
  },
  created() {
    // needs to be done here or else things don't load correctly
    // can't put it in individual modules without having issues
    Quill.register('blots/tag-module', TagBlot);
    Quill.register(SizeStyle, true);
    Quill.register(AlignmentStyle, true);
    Quill.register(LineHeightStyle, true);
    Quill.register(TextColorStyle, true);
    Quill.register(ParagraphHeightStyle, true);
    Quill.register(CustomImage, true);

    const BlockBlot = Quill.import('blots/block');

    class CustomBlockBlot extends BlockBlot {
      static create(value) {
        const node = super.create(value);
        node.setAttribute('style', 'text-align: center; font-size: 16px');
        node.setAttribute('class', 'capText');

        return node;
      }
    }

    Quill.register('formats/block', CustomBlockBlot);

    const Image = Quill.import('formats/image');

    class MyImage extends Image {
      static create(value) {
        const node = super.create(value);
        if (typeof value === 'string') {
          node.setAttribute('src', this.sanitize(value));
          node.setAttribute('class', 'capImg');
        }
        return node;
      }

    }

    Quill.register(MyImage, true);

    this.imageTimer = setInterval(this.updateHTML, 500);

  },
  beforeUnmount() {
    clearInterval(this.imageTimer);
  },
  computed: {
    quill() {
      if (!this.editorReady) {
        return null;
      }
      return this.$refs.qEditor.getQuill();
    },
  },
  methods:  {
    ready() {
      this.$refs.qEditor.getQuill().setContents(this.capTextStore.rawDelta);
      this.editorReady = true;

      this.editorChange();
      this.updateHTML();
      this.$refs.qEditor.getQuill().on('editor-change', this.editorChange);
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

    },
    updateHTML() {
      this.capTextStore.rawHTML = this.$refs.qEditor.getHTML();
      updateImageSrc();
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
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.ql-container {
    border: 1px solid white;
    font-size: 16px;
}

.ql-container img {
    max-width: 100%
}

</style>