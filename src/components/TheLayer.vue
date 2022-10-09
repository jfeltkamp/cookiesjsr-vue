<script setup>
import SetAllServices from '@/components/ui/SetAllServices';
import SaveButton from "@/components/layer/SaveButton";
import ServiceGroups from "@/components/layer/ServiceGroups";
</script>

<template>
  <div ref="dialog" class="cookiesjsr-layer--wrapper">
    <div class="cookiesjsr-layer--overlay" :title="$t('close')" @click.prevent="() => this.closeLayer()" />
    <div class="cookiesjsr-layer">
      <header class="cookiesjsr-layer--header">
        <span class="cookiesjsr-layer--title" v-trans>cookieSettings</span>
        <button type="button"
                class="cookiesjsr-layer--close dialog-first-tab"
                :title="$t('close')"
                @click.prevent="() => this.closeLayerDeny()" v-trans>close</button>
      </header>
      <div class="cookiesjsr-layer--body">
        <ServiceGroups/>
      </div>
      <footer class="cookiesjsr-layer--footer">
        <div class="cookiesjsr-layer--label-all" v-trans>settingsAllServices</div>
        <div class="cookiesjsr-layer--actions">
          <SetAllServices v-if="showDenyAll" btnType="invert denyAll" :setAll="false" v-trans>denyAll</SetAllServices>
          <SetAllServices btnType="invert allowAll" :setAll="true" v-trans>acceptAll</SetAllServices>
          <SaveButton v-trans>saveSettings</SaveButton>
        </div>
      </footer>
    </div>
  </div>
  <span tabIndex="0" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      willRefocusOpener: false
    }
  },
  computed: {
    ...mapGetters([
      'bannerVisible',
      'denyAllOnLayerClose',
      'openSettingsHash',
      'layerOpen',
      'services',
      'showDenyAll',
      'layerOpen'
    ]),
  },
  methods: {
    closeLayer() {
      this.$store.dispatch('layerClose')
    },
    closeLayerDeny() {
      this.closeLayer();
      if(this.denyAllOnLayerClose) {
        const servicesCookies = this.$scs.getServices();
        if (servicesCookies && Object.keys(servicesCookies).length === 0) {
          let services = {...this.services};
          for (let id in services) {
            services[id] = false;
          }
          this.$scs.setServices(services);
          this.$store.dispatch('setAllServices', services);
          return false;
        }
      }
    },
    refocusOpener() {
      if (this.willRefocusOpener) {
        const hrefSelector = `a[href="${this.openSettingsHash}"]`;
        let settingsBtn = document.querySelector('.cookiesjsr-settings')
            || document.querySelector(hrefSelector);
        if (settingsBtn) { settingsBtn.focus(); }
      }
    },
    tabCycle(event) {
      if (event.key === 'Tab') {
        const selector = (event.shiftKey) ? '.dialog-last-tab' : '.dialog-first-tab';
        let isIn = this.$refs.dialog.contains(document.activeElement);
        if (!isIn) {
          let activeElement = this.$refs.dialog.querySelector(selector)
          if (activeElement) {
            activeElement.focus()
          }
        }
      }
    }
  },
  beforeMount() {
    this.willRefocusOpener = !this.bannerVisible;
    document.addEventListener("keyup", this.tabCycle);
  },
  beforeUnmount() {
    document.removeEventListener("keyup", this.tabCycle);
    this.refocusOpener();
    if (window.location.hash === this.openSettingsHash) {
      window.location.hash = '';
    }
  }
}
</script>