<template>
  <div
      class="offcanvas offcanvas-start" tabindex="-1" :aria-labelledby="offcanvasId + 'label'" :id="offcanvasId"
      data-bs-scroll="true">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" :id="offcanvasId + 'label'">{{ headerName }}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot>Nothing here yet.</slot>
    </div>
  </div>
</template>
<script>
export default {
  name:  'Offcanvas',
  props: {
    headerName:  String,
    offcanvasId: String,
  },
};
</script>