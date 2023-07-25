<template>
  <button
    data-bs-target="#templateOffcanvas" data-bs-toggle="offcanvas" title="Template Options"
    class="btn btn-outline-primary" v-tooltip> Template Options
  </button>
  <teleport to="body">
    <Offcanvas offcanvas-id="templateOffcanvas" header-name="Templates">
      <select v-model="capSettingsStore.currentTemplate" class="form-select" @change="selectChange">
        <option v-for="{name, value} in templates" :value="value">{{
            name
          }}
        </option>
      </select>
      <SetCapSize/>
      <button type="button" @click="capSettingsStore.downloadAsIs = !capSettingsStore.downloadAsIs"
              :class="{active: capSettingsStore.downloadAsIs}" class="btn btn-outline-primary">
        Download cap EXACTLY as is.
      </button>
      <template v-if="capSettingsStore.currentTemplate === 'one_col'">
        <div class="input-group">
          <button @click="capSettingsStore.shrinkCapWidth = !capSettingsStore.shrinkCapWidth"
                  :class="{active: capSettingsStore.shrinkCapWidth}" v-tooltip class="btn btn-outline-primary"
                  title="Shrink cap to image width">Shrink cap to image width
          </button>
        </div>
      </template>
      <template v-else>
        <div class="input-group">
          <div class="input-group-text">Image Width Percentage</div>
          <input type="number" min="0" v-model="capSettingsStore.imagePercentage" class="form-control">
        </div>
        <div class="input-group">
          <button @click="capSettingsStore.shrinkCapHeight = !capSettingsStore.shrinkCapHeight"
                  :class="{active: capSettingsStore.shrinkCapHeight}" v-tooltip class="btn btn-outline-primary"
                  title="Shrink cap to image height">Shrink cap to image height
          </button>
        </div>
      </template>
    </Offcanvas>

  </teleport>
</template>

<script>

import { useCapSettingsStore } from "@/stores/cap-settings";
import Offcanvas from "@/components/sidebar/Offcanvas.vue";
import SetCapSize from "@/components/editor_buttons/SetCapSize.vue";

export default {
  name:       "TemplateOptions",
  components: {
    SetCapSize: SetCapSize,
    Offcanvas,
  },
  data() {
    return {
      capSettingsStore: useCapSettingsStore(),
      templates:        [
        {
          name:  'One Column',
          value: 'one_col',
        },
        {
          name:  'Two Column (Image Left)',
          value: 'two_col_img_left',
        },
        {
          name:  'Two Column (Image Right)',
          value: 'two_col_img_right',
        },
        {
          name:  'Three Column',
          value: 'three_col',
        },
      ],
    };
  },
  methods: {
    selectChange() {
      this.capSettingsStore.shrinkCapWidth  = false;
      this.capSettingsStore.shrinkCapHeight = false;
      this.capSettingsStore.useGivenWidth   = false;
      this.capSettingsStore.useGivenHeight  = false;
    },
  },
};
</script>


<style scoped>

</style>