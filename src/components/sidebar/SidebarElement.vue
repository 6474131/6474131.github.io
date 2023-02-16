<template>
  <a href="#" :title="element.title" class="nav-link py-2 border-bottom border-primary-subtle position-relative"
     data-bs-toggle="offcanvas"
     data-tooltip="tooltip" data-bs-trigger="hover" :data-bs-target="element.target"
     data-bs-placement="right">
    <i :class="element.icon" style="font-size:24px;"></i>
    <span v-if="checkErrors() > 0 && element.wizard"
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"> {{
        checkErrors()
      }}</span>

  </a>
</template>
<script>
import { useCapTextStore } from "@/stores/cap-text";
import { useCharacterTagsStore } from "@/stores/character-tags";
import { useImageStore } from "@/stores/cap-images";

export default {
  name:  'SidebarElement',
  props: {
    element:
        {
          icon:   String,
          title:  String,
          target: String,
          wizard: Boolean,
        },
  },
  data() {
    return {capText: useCapTextStore(), characterStore: useCharacterTagsStore(), imageStore: useImageStore()};
  },
  methods: {
    checkErrors() {
      // probably an issue if there's no characters or images
      const anyCharacters = this.characterStore.getCharacterNames().length > 0 ? 0 : 1;
      const anyImages     = this.imageStore.getImages().length > 0 ? 0 : 1;
      const anyText       = this.capText._rawText.length > 0 ? 0 : 1;
      return this.capText.checkNoTag().length + this.capText.checkQuotes().length + anyCharacters + anyImages + anyText;
    },
  },
};
</script>
