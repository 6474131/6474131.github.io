<template>
  <teleport to="body">
    <Offcanvas offcanvas-id="settings" header-name="Settings">
      <CapSettings/>
    </Offcanvas>
  </teleport>
  <button
    data-bs-target="#settings" data-bs-toggle="offcanvas" title="Settings"
    class="bi bi-gear btn btn-outline-primary" v-tooltip>
  </button>
</template>

<script>

import CapSettings from "@/components/sidebar/CapSettings.vue";
import Offcanvas from "@/components/sidebar/Offcanvas.vue";

export default {
  name:       "SettingsButton",
  components: {
    Offcanvas,
    CapSettings,
  },
};
</script>

<style scoped>

</style>