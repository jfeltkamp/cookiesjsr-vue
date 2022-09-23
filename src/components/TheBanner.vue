<script setup>
  import BaseLinks from "@/components/ui/BaseLinks";
  import SetAllServices from "@/components/ui/SetAllServices";
  import BaseButton from "@/components/ui/BaseButton";
</script>

<template>
  <div class="cookiesjsr-banner" :class="[(bannerVisible)?'active':'']">
    <div class="cookiesjsr-banner--info">
      <span class="cookiesjsr-banner--text" v-trans>bannerText</span>
      <BaseLinks :links="links" classes="cookiesjsr-banner--links" direction="row"/>
    </div>

    <div class="cookiesjsr-banner--action">
      <SetAllServices v-if="showDenyAll" :setAll="false" v-trans>denyAll</SetAllServices>
      <BaseButton v-if="!settingsAsLink" btnType="important" :clicked="() => $store.dispatch('layerOpen')" v-trans>settings</BaseButton>
      <SetAllServices :setAll="true" v-trans>acceptAll</SetAllServices>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters(['bannerVisible', 'cookieDocs', 'settingsAsLink', 'openSettingsHash', 'showDenyAll']),
    links() {
      const links = [
        {href: this.$t('privacyUri'), title: this.$t('privacyPolicy'), attributes: {target: '_blank'}},
        {href: this.$t('imprintUri'), title: this.$t('imprint'), attributes: {target: '_blank'}}
      ];
      if (this.cookieDocs) {
        links.push({href: this.$t('cookieDocsUri'), title: this.$t('cookieDocs'), attributes: {target: '_blank'}});
      }
      if (this.settingsAsLink) {
        links.push({href: this.openSettingsHash, title: this.$t('settings'), clicked: () => { this.$store.dispatch('layerOpen')}});
      }
      return links
    }
  }
}
</script>