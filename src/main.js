/* eslint-disable */
import { createApp } from 'vue';
import TranslationPlugin from "@/plugins/TranslationPlugin";
import StoreCookiePlugin from "@/plugins/StoreCookiePlugin";
import store from './store'
import App from './App.vue';


const app = createApp(App);
app.use(TranslationPlugin);
app.use(StoreCookiePlugin);
app.use(store);

app.mount('#app');
