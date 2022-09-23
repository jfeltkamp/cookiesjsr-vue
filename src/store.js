import { createStore } from 'vuex';
import { drupalSettings } from '@/services/DrupalService'

export default createStore({
    state() {
        console.log('DATA: ', drupalSettings.cookiesjsr);
        return {
            defaultLang: 'en',
            cookieName: 'cookiesjsr',
            openSettingsHash: '#cookiesjsr',
            layerOpen: false,
            showDenyAll: true,
            bannerVisible: true,
            settingsAsLink: false,
            services: [],
            serviceGroups: drupalSettings.cookiesjsr.services,
            activeGroup: 'default',
            groupConsent: true,
            cookieService: null,
            cookieDocs: true
        }
    },
    getters: {
        cookieName: (state) => state.cookieName,
        showDenyAll: (state) => state.showDenyAll,
        bannerVisible: (state) => state.bannerVisible,
        cookieDocs: (state) => state.cookieDocs,
        settingsAsLink: (state) => state.settingsAsLink,
        openSettingsHash: (state) => state.openSettingsHash,
        services: (state) => state.services,
        serviceGroups: (state) => state.serviceGroups,
        groupConsent: (state) => state.groupConsent,
        activeGroup: (state) => state.activeGroup,
    },
    mutations: {
        layerToggle(state, payload) { state.layerOpen = payload.open },
        bannerToggle(state, payload) { state.bannerVisible = payload.open },
        setAllServices(state, payload) {
            console.log('#pup payload', payload);
        },
        setActiveGroup(state, payload) {
            state.activeGroup = payload.activeGroup;
        },
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
        }
    }
});