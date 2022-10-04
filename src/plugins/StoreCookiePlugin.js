import StoreCookieService from '@/services/StoreCookieService'

const StoreCookiePlugin = {

    install(Vue) {
        // Provide app wide available service to manage the store cookie.
        Vue.config.globalProperties.$scs = StoreCookieService;

    }
}
export default StoreCookiePlugin;