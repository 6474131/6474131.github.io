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

export default {
  name:       "CapMaker",
  components: {
    FaqModal,
    Sidebar,
  },
  data() {
    return {capTextStore: useCapTextStore()};
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

.capContainer > div:last-child {
  padding-bottom: 2.5em;
}
</style>
