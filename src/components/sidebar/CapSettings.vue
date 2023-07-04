<template>
    <button class="btn btn-danger mb-3" type="button" @click="clearCache()">Clear Cache</button>
</template>

<script>
import { useCapStyleStore } from "@/stores/cap-style";
import { useCapSettingsStore } from "@/stores/cap-settings";
import { useFirebaseAuth } from "vuefire";
import { signOut } from "firebase/auth";

export default {
  name: "CapSettings",
  data() {
    return {
      capStyleStore:    useCapStyleStore(),
      capSettingsStore: useCapSettingsStore(),
      debug:            false,
      useGivenWidth:    false,
    };
  },
  methods: {
    clearCache() {
      localStorage.clear();
      location.reload();
    },
    signOutUser() {
      signOut(useFirebaseAuth()).then(() => {
        console.log("Sign out successful.");
      }).catch((reason) => {
        console.log("Sign out failed: " + reason);
      });
    },
  },
};
</script>

<style scoped>
/*input::-webkit-outer-spin-button*/
/*input::-webkit-inner-spin-button {*/
/*  -webkit-appearance: none;*/
/*  margin: 0;*/
/*}*/
</style>