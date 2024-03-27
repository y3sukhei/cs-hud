import * as Vue from '/dependencies/vue.js'
import { loadModule } from '/dependencies/vue3-sfc-loader.js'
import { sfcLoaderOptions } from '/dependencies/vue3-sfc-loader-options.js'
import { connectToWebsocket } from '/hud/core/websocket.js'
import {players } from '/hud/core/state.js'


connectToWebsocket()

const app = Vue.createApp(
	Vue.defineAsyncComponent(() => loadModule('/config/options/options.vue', sfcLoaderOptions)),
)

app.config.globalProperties.$players = players

app.mount('#app')
