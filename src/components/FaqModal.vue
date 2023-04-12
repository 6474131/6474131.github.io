<template>
  <div class="modal" tabindex="-1" id="faq">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Numbers' Cap Maker FAQ</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="fw-bold">How do I use this website?</p>
          <p>From a practical standpoint, all you need to do is enter in the text of your cap (clicking the paragraph
             icon will bring you to where to enter it), and then go to the cap wizard (the wand icon) to finish up your
             cap. Click on the hyperlink it provides you and follow the flow of each section.</p>
          <p class="fw-bold">How do I add characters?</p>
          <p>Go to the characters tab (icon that looks like two people), and enter a name for your new character. After
             you do so, a few options will pop up. Adjust them to how you want the text for that character to look, such
             as giving them a unique color or font.</p>
          <p>And while you don't technically need to know this if you use the cap wizard, you can specify the characters
             used for specific dialogue ahead of time in your text by doing [<span
                style="color: blue;">character name</span>] "Your text here." But you shouldn't need to do this, and I
             recommend using the caption wizard for ease and speed anyway.</p>
          <p class="fw-bold">How do I change how the cap looks?</p>
          <p>Go to the gear icon for the cap settings, and you'll be able to change how the overall cap looks (like the
             normal font color, size, font family) there.</p>
          <p class="fw-bold">How do I add images?</p>
          <p>You can add images by going to the easel icon. From there you can upload images (they cannot be links to a
             website, they have to be downloaded). They will be automatically added to the top of the caption, but can
             be moved by placing around the {img} text wherever in the text you want. You can also use multiple images,
             and if you do, you can select specific ones by using {imgx} where x is the number of the image you want to
             use (starting at 1).</p>
          <p class="fw-bold">How do I download my cap?</p>
          <p>You can download your cap by going to the caption wizard, and clicking the Download Cap button. You may
             have to wait a moment, especially if your caption is long or if you're using an especially high resolution
             picture.</p>
          <p class="fw-bold">How do I get a transcript for my cap?</p>
          <p>I don't think anyone has ever asked this, but you can actually get a transcript for your cap by clicking
             the 'get transcript' button. It will copy the text to your clipboard. If you selected it to be a transcript
             for Reddit, it will also escape markdown text for you so that it shows up correctly.</p>
          <p class="fw-bold">Help! Something happened and now my page is all messed up!</p>
          <p>Well, if you can read this, it's probably not broken too badly. But if you can go to the cap wizard tab,
             just click the clear cache button. Or if you encounter other problems, clear the cache on your browser and
             then reload the page.</p>
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