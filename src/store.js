import { createStore } from 'vuex';
import conf from "@/services/ConfigService";
import scs from "@/services/StoreCookieService";


export default createStore({
    state() {
        return {
            activeGroup: 'default',
            bannerVisible: scs.isUpdateRequired(),
            cookieDocs: conf.get('config.interface.cookieDocs',true),
            defaultLang: conf.get('config.interface.defaultLang','en'),
            denyAllOnLayerClose: conf.get('config.interface.denyAllOnLayerClose',false),
            groupConsent: conf.get('config.interface.groupConsent',true),
            layerOpen: false,
            openSettingsHash: conf.get('config.interface.openSettingsHash','#cookiesjsr'),
            serviceGroups: conf.getServiceGroups(),
            services: scs.getServicesStatus(),
            settingsAsLink: conf.get('config.interface.settingsAsLink',false),
            showDenyAll: conf.get('config.interface.showDenyAll', true),
        }
    },
    getters: {
        activeGroup: (state) => state.activeGroup,
        bannerVisible: (state) => state.bannerVisible,
        cookieDocs: (state) => state.cookieDocs,
        denyAllOnLayerClose: (state) => state.denyAllOnLayerClose,
        groupConsent: (state) => state.groupConsent,
        layerOpen: (state) => state.layerOpen,
        openSettingsHash: (state) => state.openSettingsHash,
        serviceGroups: (state) => state.serviceGroups,
        services: (state) => state.services,
        settingsAsLink: (state) => state.settingsAsLink,
        showDenyAll: (state) => state.showDenyAll,
    },
    mutations: {
        bannerToggle(state, payload) { state.bannerVisible = payload.open },
        layerToggle(state, payload) { state.layerOpen = payload.open },
        setActiveGroup(state, payload) {
            state.activeGroup = payload.activeGroup;
        },
        setAllServices(state, payload) {
            console.log('#pup payload', payload);
        },
        setService(state, payload) {
            state.services[payload.service] = payload.value;
        }
    },
    actions: {
        layerOpen(context) {context.commit('layerToggle', {open: true})},
        layerClose(context) {context.commit('layerToggle', {open: false})},
        bannerOpen(context) {context.commit('bannerToggle', {open: true})},
        bannerClose(context) {context.commit('bannerToggle', {open: false})},
        setAllServices(context, payload) {
            context.commit('setAllServices', payload)
        },
        setActiveGroup(context, payload) {
            context.commit('setActiveGroup', payload)
        },
        setService(context, payload) {
            context.commit('setService', payload)
        },
        setMultipleServices(context, payload) {
            console.log(payload);
            for (const [key, value] of Object.entries(payload)) {
                context.commit('setService', {
                    service: key,
                    value: value
                })
            }
        }
    }
});