<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Numbers' Cap Maker FAQ</h5>
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
        </div>
        <div class="modal-body">
          <p class="fw-bold">How do I use this website?</p>
          <p>Enter cap text, either by copy and pasting from a google doc or word document (it should keep
            formatting)</p>
          <p>Make sure to add an image if you don't already have one, by clicking 'manage images'. You can add an image
            to the document by either uploading a new one or by clicking the image under the dropdown.</p>
          <p>You can color the dialogue of characters the old fashioned way by manually highlighting their text, or you
            can use the 'mark text as' feature. Just click the 'Mark ...' button to activate it, then select a
            character you previously created or can create by going to the character menu, click or tap on the dialogue
            you want colored, and it will automatically do color that piece of dialogue for you!</p>
          <p class="fw-bold">How do I download my cap?</p>
          <p>Go to 'finish cap'. There should be a 'download' button at the top. You can also choose from several
            different templates to change what your cap looks like before being downloaded under 'template options'.</p>
          <p class="fw-bold">Help! Something happened and now my page is all messed up!</p>
          <p>Well, if you can read this, it's probably not broken too badly. But you can clear the cache by
            clicking the gear button and clicking the 'clear cache' button on the offcanvas.</p>
          <p class="fw-bold">Where can I ask questions?</p>
          <p>There's a discord server used <a href="https://discord.com/invite/tfvMXhN68b">here</a> where you are more
            than welcome to ask questions. Beware of possible NSFW.</p>
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
    document.getElementById("faq")
            .addEventListener('hide.bs.modal', () => {
              this.faqStore.closed = true;
            });
  },
};
</script>

<style scoped>

</style>