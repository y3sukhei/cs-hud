import * as Vue from "/dependencies/vue.js";
import { sfcLoaderOptions } from "/dependencies/vue3-sfc-loader-options.js";
import { loadModule } from "/dependencies/vue3-sfc-loader.js";

const app = Vue.createApp(
  Vue.defineAsyncComponent(() =>
    loadModule("/config/options/options.vue", sfcLoaderOptions)
  )
);

app.mount("#app");
