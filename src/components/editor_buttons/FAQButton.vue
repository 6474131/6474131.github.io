<template>
  <teleport to="body">
    <FaqModal id="faq"/>
  </teleport>
  <button
    data-bs-target="#faq" data-bs-toggle="modal" title="FAQ"
    class="bi bi-question-lg btn btn-outline-primary" v-tooltip
    href="#">
  </button>
</template>

<script>

import FaqModal from "@/components/FaqModal.vue";

export default {
  name:       "FAQButton",
  components: {FaqModal},
};
</script>

<style scoped>

</style>