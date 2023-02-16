<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <Sidebar/>
      </div>
      <div class="border col text-center m-3 px-0">
        <h2>Cap Preview</h2>
        <div class="capContainer" id="capContainer"
             style="word-break: break-word">
          <div class="w-100" v-html="textStore.htmlText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import { useCapTextStore } from "@/stores/cap-text";

export default {
  name:       "CapMaker",
  components: {Sidebar},
  data() {
    return {textStore: useCapTextStore()};
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Lobster+Two&family=Roboto&family=Tinos&display=swap');

img {
  width: 100%;
}
</style>

