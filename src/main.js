import { createApp } from 'vue';
import { createPinia } from 'pinia';
import uniqueId from 'vue-uuid';

import App from './App.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { tooltip } from "@/js/tooltip";

const app = createApp(App);
app.use(uniqueId);
app.directive('tooltip', tooltip);

app.use(createPinia());

app.mount('#app');
