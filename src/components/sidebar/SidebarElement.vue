<template>
    <a
            :data-bs-target="target" :data-bs-toggle="bsToggleType" :title="title"
            class="nav-link py-2 border-bottom border-primary-subtle position-relative"
            data-bs-placement="right" data-bs-trigger="hover" data-tooltip="tooltip"
            href="#"> <i :class="icon" style="font-size:24px;"></i> <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"></span>

    </a>
</template>
<script>

export default {
  name:  'SidebarElement',
  props: {
    icon:         String,
    title:        String,
    target:       String,
    bsToggleType: {
      type:    String,
      default: "offcanvas",
    },
  },
};
</script>
