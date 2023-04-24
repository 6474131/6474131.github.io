<template>
  <div id="faq" class="modal" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Numbers' Cap Maker FAQ</h5>
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
        </div>
        <div class="modal-body">
          <p class="fw-bold">How do I use this website?</p>
          <p>Go to the 'editor' tab. Write your cap. Add your image using the image manager, add characters in the
             character tab, color your character dialogue... adjust the rest of the text to taste, download, and you're
             done!</p>
          <p class="fw-bold">How do I add characters?</p>
          <p>Go to the characters tab (icon that looks like two people), and enter a name for your new character. After
             you do so, a few options will pop up. Adjust them to how you want the text for that character to look, such
             as giving them a unique color or font.</p>
          <p class="fw-bold">How do I add padding for text images?</p>
          <p>Go to the gear icon for the cap settings.</p>
          <p class="fw-bold">How do I add images?</p>
          <p>Click on the 'manage images' (an easel) button in the editor. You can add or remove images there. Moving
             around images can also be done by clicking and dragging.</p>
          <p class="fw-bold">How do I download my cap?</p>
          <p>Click the 'download cap' (downward arrow icon) button. It may take a few moments if the image is a gif or
             particularly large.</p>
          <p class="fw-bold">Help! Something happened and now my page is all messed up!</p>
          <p>Well, if you can read this, it's probably not broken too badly. But you can clear the cache by going to the
             'cap settings' tab and clicking the 'clear cache' button on the bottom.</p>
          <p class="fw-bold">How do I get back to this page?</p>
          <p>Click the question mark icon on the sidebar.</p>
          <p class="fw-bold">How do I leave this page?</p>
          <p>Click the X button at the top right or press escape.</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { useFaqStore } from "@/stores/faq-store";

export default {
  name: "FaqModal",
  data() {
    return {
      faqStore: useFaqStore(),
      modalObj: null,
    };
  },
  mounted() {
    this.modalObj = Modal.getOrCreateInstance(document.getElementById("faq"));

    if (!this.faqStore.closed) {
      this.modalObj.show();
    }
    document.getElementById("faq").addEventListener('hide.bs.modal', () => {
      this.faqStore.closed = true;
    });
  },
};
</script>

<style scoped>

</style>