<template>
    <div v-tooltip class="btn-group dropdown" role="group" title="Font Size">
        <button
                aria-expanded="false"
                class="btn btn-outline-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button"> {{ fontSize ? fontSize : "" }}
        </button>
        <ul class="dropdown-menu" style="min-width: 25px; max-height: 500px; overflow-y: auto; overflow-x: clip">
            <li><a
                    v-for="index in 100"
                    v-tooltip
                    class="dropdown-item"
                    href="#"
                    @click="this.fontSize = index; changeSize()">{{ index }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { validateFormat } from "@/js/global";

export default {
  name:  "SizeButton",
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
      fontSize: 16,
    };
  },
  watch:   {
    editorReady() {
      this.quill.on('editor-change', () => {
        const range     = this.quill.getSelection();
        let default_val = '16';
        if (range) {
          default_val = this.quill.getFormat(range.index, range.length)['fontsize'] ?? default_val;
        }
        this.fontSize = parseInt(validateFormat(default_val) ?? default_val);
      });
    },
  },
  methods: {
    changeSize() {
      const range = this.quill.getSelection();
      if (range) {
        this.quill.formatText(range.index, range.length, 'fontsize', this.fontSize + "px");
      }
    },
  },
};
</script>

<style scoped>

</style>