<template>
  <div class="d-flex flex-column border border-primary sticky-top" style="width: 4.5rem;">
    <ul class="nav nav-flush flex-column text-center">
      <li v-for="element in elements">
        <SidebarElement v-tooltip v-bind="element"/>
      </li>
    </ul>
    <SidebarOffcanvases/>
  </div>
</template>

<script>
import SidebarElement from "@/components/sidebar/SidebarElement.vue";
import SidebarOffcanvases from "@/components/sidebar/SidebarOffcanvases.vue";

export default {
  name:       "Sidebar",
  components: {
    SidebarOffcanvases,
    SidebarElement,
  },
  data() {
    return {
      elements: [
        {
          icon:   'bi-people',
          title:  'Characters',
          target: '#offcanvasCharacters',
        },
        {
          icon:   'bi-body-text',
          title:  'Editor',
          target: '#offcanvasText',
        },
        {
          icon:   'bi-gear',
          title:  'Settings',
          target: '#offcanvasSettings',
        },
        {
          icon:         'bi-question-lg',
          title:        'FAQ',
          target:       '#faq',
          bsToggleType: 'modal',
        },
      ],
    };
  },
};
</script>

