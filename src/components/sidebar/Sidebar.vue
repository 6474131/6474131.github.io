<template>
  <div class="d-flex flex-column border border-primary m-3 sticky-top" style="width: 4.5rem;">
    <ul class="nav nav-flush flex-column text-center">
      <li v-for="element in elements">
        <SidebarElement v-bind="element"/>
      </li>
    </ul>
    <SidebarOffcanvases/>
  </div>
</template>

<script>
import { Tooltip } from 'bootstrap';
import SidebarElement from "@/components/sidebar/SidebarElement.vue";
import SidebarOffcanvases from "@/components/sidebar/SidebarOffcanvases.vue";

export default {
  name:       "Sidebar",
  components: {
    SidebarOffcanvases,
    SidebarElement,
  },
  mounted() {
    const tooltipTriggerList = document.querySelectorAll('[data-tooltip="tooltip"]');
    const tooltipList        = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  },
  data() {
    return {
      elements: [
        {
          icon:   'bi-people',
          title:  'Characters',
          target: '#offcanvasCharacters',
        }, {
          icon:   'bi-easel',
          title:  'Images',
          target: '#offcanvasImages',
        }, {
          icon:   'bi-body-text',
          title:  'Text',
          target: '#offcanvasText',
        }, {
          icon:   'bi-gear',
          title:  'Settings',
          target: '#offcanvasSettings',
        }, {
          icon:   'bi-magic',
          title:  'Caption Wizard',
          target: '#offcanvasWizard',
          wizard: true,
        }, {
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

