<template>
    <div
            :id="offcanvasId" :aria-labelledby="offcanvasId + 'label'" class="offcanvas offcanvas-start"
            data-bs-scroll="true"
            tabindex="-1">
        <div class="offcanvas-header">
            <h5 :id="offcanvasId + 'label'" class="offcanvas-title">{{ headerName }}</h5>
            <button aria-label="Close" class="btn-close" data-bs-dismiss="offcanvas" type="button"></button>
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