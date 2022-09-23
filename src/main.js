/* eslint-disable */
import { createApp } from 'vue';
import TranslationPlugin from "@/plugins/TranslationPlugin";
import store from './store'
import App from './App.vue';


const app = createApp(App);
app.use(TranslationPlugin, {lang: 'de-DE'})
app.use(store);

app.mount('#app');
