<template>
    <Offcanvas header-name="Characters" offcanvas-id="offcanvasCharacters">
        <TagForm/>
    </Offcanvas>
    <Offcanvas header-name="Cap Text" offcanvas-id="offcanvasText">
        <CapTextArea class="h-100"/>
    </Offcanvas>
    <Offcanvas header-name="Settings" offcanvas-id="offcanvasSettings">
        <CapSettings/>
    </Offcanvas>
</template>

<script>
import Offcanvas from "@/components/sidebar/Offcanvas.vue";
import TagForm from "@/components/sidebar/TagForm.vue";
import CapTextArea from "@/components/sidebar/CapTextArea.vue";
import CapSettings from "@/components/sidebar/CapSettings.vue";

export default {
  name:       "SidebarOffcanvases",
  components: {
    CapSettings,
    CapTextArea,
    TagForm,
    Offcanvas,
  },
};
</script>

<style scoped>

</style>