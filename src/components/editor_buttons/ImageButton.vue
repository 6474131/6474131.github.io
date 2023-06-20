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
      <li v-for="({url}, index) in capImageStore.images" class="mb-3">
        <div class="d-flex">
          <a
            class="ms-2"
            href="#"><img
            v-tooltip
            :alt="index"
            :src="url"
            title="Add image at cursor"
            @click="addImageAtCursor(index)"></a>
          <button
            v-tooltip
            class="btn btn-sm btn-outline-danger bi-x align-self-center ms-2 me-2"
            title="Remove image"
            @click="removeImage"/>
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
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { FirebaseImage } from "@/js/firebase_objects/image-object";
import { getCurrentUser, useFirestore } from "vuefire";
import { useCapTextStore } from "@/stores/cap-text";

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
        const fileArrayBuffer = await file.arrayBuffer();
        const hashArrayBuffer = await crypto.subtle.digest('SHA-256', fileArrayBuffer);
        const hash            = this.bufferToHex(hashArrayBuffer);

        const currentUser = await getCurrentUser();
        const imagePath   = `images/${currentUser.uid}/${hash}`;
        console.log("Storage: " + imagePath);
        const q             = query(
          collection(db, 'images'), where("path", "==", imagePath), where("sourceUid", "==", currentUser.uid),
          limit(1),
        );
        const querySnapshot = await getDocs(q.withConverter(FirebaseImage.imageConverter));
        if (querySnapshot.docs.length > 0) {
          const firebaseImage = querySnapshot.docs[0].data();
          console.log("Using previous download url: " + firebaseImage.url);
          this.capImageStore.addImage(firebaseImage);
          this.quill.insertEmbed(0, 'customimage', firebaseImage.url);
          return;
        }

        try {
          const imageStorageRef = storageRef(getStorage(), imagePath);

          uploadBytes(imageStorageRef, file).then((snapshot) => {
            console.log("Uploaded successfully!");
            getDownloadURL(snapshot.ref).then(async (downloadUrl) => {
              const newImageDocRef           = await addDoc(
                collection(db, 'images').withConverter(FirebaseImage.imageConverter), {
                  path:        imageStorageRef.fullPath,
                  hash:        hash,
                  sourceUid:   currentUser.uid,
                  contentType: file.type,
                  url:         downloadUrl,
                });
              const newImageDocumentSnapshot = await getDoc(newImageDocRef);
              this.capImageStore.addImage(newImageDocumentSnapshot.data());
              this.quill.insertEmbed(0, 'customimage', downloadUrl);
            });
          }).catch((reason) => {
            console.log("Error uploading: " + reason);
          });
        }
        catch (e) {
          console.log("There was an error uploading the image: " + e);
        }
      };
      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      }
      this.$refs.fileUpload.value = '';

    },
    addImageAtCursor(imageIndex) {
      const range = this.quill.getSelection();
      if (range) {
        const imageUrl = this.capImageStore.getImage(imageIndex).url;
        console.log("URL: " + imageUrl);
        this.quill.insertEmbed(range.index, 'customimage', imageUrl);
      }
    },
    bufferToHex(buffer) {
      let s = '', h = '0123456789abcdef';
      (new Uint8Array(buffer)).forEach((v) => {
        s += h[v >> 4] + h[v & 15];
      });
      return s;
    },
    removeImage(index) {
      this.capImageStore.removeImage(index);
    },
  },
};
</script>

<style scoped>

</style>
