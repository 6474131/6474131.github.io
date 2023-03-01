<template>
  <div class="mb-3">
    <div class="mb-3">Your image will be automatically added to the top of the text, make sure to move the {img} tag if
      you want it somewhere else!
    </div>
    <label for="formFile" class="form-label">Upload image...</label>
    <input class="form-control mb-3" type="file" id="formFile" @change="onInputChange">
    <template v-for="(imageSrc, index) in imageStore.getImages()">
      <div>Image {{ index + 1 }}</div>
      <img alt="Error uploading image." :src="imageSrc" class="img-thumbnail img-fluid mb-3">
      <button type="button" class="btn btn-danger" @click="imageStore.removeImage(index)">Remove image</button>
    </template>
  </div>
</template>

<script>
import { useImageStore } from "@/stores/cap-images";
import { useCapTextStore } from "@/stores/cap-text";

export default {
  name: "ImageUpload",
  data() {
    return {imageStore: useImageStore(), textStore: useCapTextStore()};
  },
  methods: {
    onInputChange(e) {
      let file      = document.querySelector('input[type=file]').files[0];
      let reader    = new FileReader();
      reader.onload = () => {
        this.imageStore.addImage(reader.result);
        this.textStore.setText("{img}\n" + this.textStore.getText());
      };
      // I think sometimes it's not a blob if you click on the button and don't
      // supply a file...? not entirely sure why this happens sometimes
      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>

</style>