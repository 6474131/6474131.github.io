<template>
  <KeepAlive>
    <CapTextArea v-if="miscStore.capEditMode" style="height: 94vh;" class="px-1"/>
  </KeepAlive>
  <KeepAlive>
    <CapContainer v-if="!miscStore.capEditMode" style="width: 98vw;" class="px-1"/>
  </KeepAlive>
</template>

<script>
import FaqModal from "@/components/FaqModal.vue";
import CapTextArea from "@/components/sidebar/CapTextArea.vue";
import CapContainer from "@/components/CapContainer.vue";
import { useMiscStore } from "@/stores/misc-store";

export default {
  name:       "CapMaker",
  components: {
    CapContainer,
    CapTextArea,
    FaqModal,
  },
  data() {
    return {
      miscStore:        useMiscStore(),
    };
  },
};
</script>
<style>

</style>
