import { createPinia } from 'pinia';
import uniqueId from 'vue-uuid';

import { createApp } from 'vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { tooltip } from "@/js/tooltip";
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from "vuefire";
import { firebaseApp } from "@/js/firebase";
import App from './App.vue';

const app = createApp(App);
app.use(uniqueId);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireFirestoreOptionsAPI(), VueFireAuth()],
});
app.directive('tooltip', tooltip);
app.use(createPinia());

app.mount('#app');
