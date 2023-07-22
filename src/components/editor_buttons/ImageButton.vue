<template>
  <div v-tooltip class="btn-group" role="group" title="Manage Images">
    <button
      aria-expanded="false"
      class="btn btn-outline-primary dropdown-toggle bi bi-easel"
      data-bs-auto-close="outside"
      data-bs-toggle="dropdown"
      type="button"> Manage Images
    </button>
    <ul class="dropdown-menu">
      <li v-for="(image, index) in capImageStore.images" v-if="editorReady" class="mb-3">
        <div class="d-flex">
          <a
            class="ms-2"
            href="#"><img
            v-tooltip
            :alt="index"
            :src="image.url"
            title="Add image at cursor"
            @click="addImageAtCursor(index)"></a>
          <button
            v-tooltip
            class="btn btn-sm btn-outline-danger bi-x align-self-center ms-2 me-2"
            title="Remove image"
            @click="removeImage(index)"/>
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
import { useFirestore } from "vuefire";
import { useCapTextStore } from "@/stores/cap-text";
import { FirebaseImage } from "@/js/firebase_objects/image-object";

const db = useFirestore();
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
      capTextStore:  useCapTextStore(),
    };
  },
  methods: {
    imageUpload() {
      let file      = this.$refs.fileUpload.files[0];
      let reader    = new FileReader();
      reader.onload = async () => {
        const firebaseImage = await FirebaseImage.initializer(file);
        this.capImageStore.addImage(firebaseImage);
        this.quill.insertEmbed(0, 'customimage', {
          url:  firebaseImage.url,
          hash: firebaseImage.hash,
        });
      };

      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      }
      this.$refs.fileUpload.value = '';

    },
    async addImageAtCursor(imageIndex) {
      const range = this.quill.getSelection();
      if (range) {
        const image = this.capImageStore.getImage(imageIndex);
        this.quill.insertEmbed(range.index, 'customimage', {
          url:  image.url,
          hash: image.hash,
        });
      }
    },
    async removeImage(index) {
      const image = await this.capImageStore.removeImage(index);
      if (image != null) {
        this.capTextStore.rawDelta.ops = this.capTextStore.rawDelta.ops.filter(op => {
          return !(op.insert.customimage != null && op.insert.customimage.hash === image.hash);

        });
      }
      this.quill.setContents(this.capTextStore.rawDelta);
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}

</style>
