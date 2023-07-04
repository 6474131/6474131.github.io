<template>
    <div v-tooltip class="btn-group" role="group" title="Copy Transcript">
        <button
          aria-expanded="false"
          class="btn btn-outline-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          type="button">Transcript
        </button>
        <ul class="dropdown-menu">
            <li>
                <div class="dropdown-item">
                    <button class="btn" @click="copyTranscript(false)">Normal Transcript</button>
                </div>
            </li>
            <li>
                <div class="dropdown-item">
                    <button class="btn" @click="copyTranscript(true)">Reddit Transcript</button>
                </div>
            </li>
        </ul>

    </div>

</template>

<script>
import { useCapTextStore } from "@/stores/cap-text";

export default {
  name: "TranscriptButton",
  data() {
    return {
      capTextStore: useCapTextStore(),
    };
  },
  methods: {
    copyTranscript(redditTranscript) {
      // to coerce it into an 'owned' string type
      let text = "" + this.capTextStore.rawText;
      // adjusted for markdown
      if (redditTranscript) {
        text = text.replaceAll(/^\s*?>/gm, '\\>');
        text = text.replaceAll(/\n+/g, '\n\n');
      }
      navigator.clipboard.writeText(text);
      alert("Copied the cap text.");
    },
    clearCache() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>

<style scoped>

</style>