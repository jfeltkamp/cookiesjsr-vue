import TranslationService from '../services/TranslationService'

const TranslationPlugin = {

    install(Vue) {
        const TS = new TranslationService();

        // Inject directive for translatable Strings.
        // example: <div v-trans>Say it in German.</div
        Vue.directive('trans', {
            created(el) {
                el.textContent = TS.t(el.textContent);
            }
        });

        // Provide app wide available function to translate string.
        Vue.config.globalProperties.$t = function (text) {
            return TS.t(text);
        };

    }
}
export default TranslationPlugin;