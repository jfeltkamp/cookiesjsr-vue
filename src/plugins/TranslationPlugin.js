import TranslationService from '../services/TranslationService'

const TranslationPlugin = {

    install(Vue) {

        // Inject directive for translatable Strings.
        // example: <div v-trans>Say it in German.</div
        Vue.directive('trans', {
            created(el) {
                el.textContent = TranslationService.t(el.textContent);
            }
        });

        // Provide app wide available function to translate string.
        Vue.config.globalProperties.$t = function (text) {
            return TranslationService.t(text);
        };

    }
}
export default TranslationPlugin;