<template>
  <button title="DO IT"
          class="bi btn btn-success" @click="miscStore.capEditMode = !miscStore.capEditMode">
    {{ text }}
  </button>
</template>

<script>

import { useMiscStore } from "@/stores/misc-store";

export default {
  name: "CapEditButton",
  data() {
    return {
      miscStore: useMiscStore(),
    };
  },
  computed: {
    text() {
      if (this.miscStore.capEditMode) {
        return "Finish Cap";
      }
      return "Edit Cap";
    },
  },
};
</script>


<style scoped>

</style>