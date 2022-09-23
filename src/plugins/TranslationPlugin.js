import TranslationService from '../services/TranslationService'

const TranslationPlugin = {

    install(Vue, options) {
        const TS = new TranslationService();

        // 1. add global method or property
        // Vue.myGlobalMethod = function () {}

        // 2. add a global asset
        Vue.directive('trans', {
            created(el) {
                el.textContent = TS.t(el.textContent);
            }
            // bind (el, binding, vnode, oldVnode) {}
        });

        // 3. inject some component options
        Vue.mixin({
            created: function () {
                console.log('Translation:', options.lang)
            }
        })

        Vue.config.globalProperties.$t = function (text) {
            return TS.t(text);
        };

    }
}
export default TranslationPlugin;