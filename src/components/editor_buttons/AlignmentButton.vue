<template>
    <div v-tooltip class="btn-group" role="group" title="Alignment">
        <button
                aria-expanded="false"
                class="btn btn-outline-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button">
            <i :class="shownAlignment"/>
        </button>
        <ul class="dropdown-menu" style="min-width: 20px">
            <li><a
                    v-for="{title, val, icon} in options"
                    v-tooltip
                    :title="title"
                    class="dropdown-item"
                    href="#"
                    @click="this.currentAlign = val; align()"><i :class="icon" class="bi"/></a>
            </li>
        </ul>
    </div>
</template>

<script>


import { validateFormat } from "@/js/global";

export default {
  name:  "AlignmentButton",
  props: {
    quill:       {
      default:  null,
      required: true,
    },
    editorReady: {
      default:  false,
      required: true,
    },
  },
  data() {
    return {
      currentAlign: 'left',
      options:      [
        {
          title: 'Left',
          val:   false,
          icon:  'bi-text-left',

        },
        {
          title: 'Center',
          val:   'center',
          icon:  'bi-text-center',
        },
        {
          title: 'Right',
          val:   'right',
          icon:  'bi-text-right',
        },
      ],
    };
  },
  computed: {
    shownAlignment() {
      if (this.currentAlign == null) {
        return "";
      }
      return `bi-text-${this.currentAlign}`;
    },
  },
  watch:    {
    editorReady() {
      this.quill.on('editor-change', () => {
        const range     = this.quill.getSelection();
        let default_val = 'left';
        if (range) {
          default_val = this.quill.getFormat(range.index, range.length)['align'] ?? default_val;
        }
        this.currentAlign = validateFormat(default_val) ?? default_val;
      });
    },
  },
  methods:  {
    align() {
      console.log(`${this.currentAlign}`);
      const range = this.quill.getSelection();
      if (range) {
        this.quill.formatLine(range.index, range.length, 'align', this.currentAlign);
      }
    },
  },
};
</script>

<style scoped>

</style>
