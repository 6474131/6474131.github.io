<template>
  <teleport to="body">
    <Offcanvas offcanvas-id="charactersettings">
      <CharacterSettings/>
    </Offcanvas>
  </teleport>
  <button
    data-bs-target="#charactersettings" data-bs-toggle="offcanvas" title="Character Settings"
    class="btn btn-outline-primary" v-tooltip> Character Settings
  </button>

</template>

<script>

import Offcanvas from "@/components/sidebar/Offcanvas.vue";
import CharacterSettings from "@/components/sidebar/CharacterSettings.vue";

export default {
  name:       "CharacterSettingsButton",
  components: {
    CharacterSettings,
    Offcanvas,
  },
};
</script>

<style scoped>

</style>