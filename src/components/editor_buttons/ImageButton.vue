<template>
  <div v-tooltip class="btn-group" role="group" title="Manage Images">
    <button
        aria-expanded="false"
        class="btn btn-outline-primary dropdown-toggle"
        data-bs-auto-close="outside"
        data-bs-toggle="dropdown"
        type="button"><i class="bi-easel"/>
    </button>
    <ul class="dropdown-menu">
      <li v-for="(src, index) in capImageStore.images" class="mb-3">
        <div class="d-flex">
          <a
              class="ms-2"
              href="#"><img
              v-tooltip
              :alt="index"
              :src="src"
              title="Add image at cursor"
              @click="addImageAtCursor(index)"></a>
          <button
              v-tooltip
              class="btn btn-sm btn-outline-danger bi-x align-self-center ms-2 me-2"
              title="Remove image"
              @click="capImageStore.removeImage(index)"/>
        </div>
      </li>
      <li>
        <div class="d-flex justify-content-center">
          <!--          work around so that you can upload files by clicking a button-->
          <button
              v-tooltip
              class="btn btn-sm btn-outline-success bi-plus"
              title="Add Image"
              @click="$refs.fileUpload.click()"/>
          <input
              id="formFile"
              ref="fileUpload"
              class="visually-hidden form-control mb-3"
              type="file"
              @change="imageUpload">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import { useImageStore } from "@/stores/cap-images";

export default {
  name:  "ImageButton",
  props: {
    quill:       {
      default:  null,
      required: true,
    },
    editorReady: {
      default:  false,
      required: true,
    },
  },
  data() {
    return {
      capImageStore: useImageStore(),
    };
  },
  computed: {},
  methods:  {
    imageUpload(e) {
      let file      = this.$refs.fileUpload.files[0];
      let reader    = new FileReader();
      reader.onload = () => {
        this.capImageStore.addImage(reader.result);
        this.quill.insertEmbed(0, 'image', reader.result);
      };
      // I think sometimes it's not a blob if you click on the button and don't
      // supply a file...? not entirely sure why this happens sometimes
      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      }
      e.target.value = "";
    },
    addImageAtCursor(imageIndex) {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.insertEmbed(range.index, 'image', this.capImageStore.getImage(imageIndex));
      }

    },
  },
};
</script>

<style scoped>

</style>
