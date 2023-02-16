<template>
  <Offcanvas header-name="Characters" offcanvas-id="offcanvasCharacters">
    <TagForm/>
  </Offcanvas>
  <Offcanvas header-name="Cap Text" offcanvas-id="offcanvasText">
    <CapTextArea class="h-100"/>
  </Offcanvas>
  <Offcanvas header-name="Images" offcanvas-id="offcanvasImages">
    <ImageUpload/>
  </Offcanvas>
  <Offcanvas header-name="Settings" offcanvas-id="offcanvasSettings">
    <CapSettings/>
  </Offcanvas>
  <Offcanvas header-name="Wizard" offcanvas-id="offcanvasWizard">
    <CapWizard/>
  </Offcanvas>
</template>

<script>
import Offcanvas from "@/components/sidebar/Offcanvas.vue";
import TagForm from "@/components/TagForm.vue";
import CapTextArea from "@/components/sidebar/CapTextArea.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import CapSettings from "@/components/CapSettings.vue";
import CapWizard from "@/components/sidebar/CapWizard.vue";

export default {
  name:       "SidebarOffcanvases",
  components: {CapWizard, CapSettings, ImageUpload, CapTextArea, TagForm, Offcanvas},
};
</script>

<style scoped>

</style>