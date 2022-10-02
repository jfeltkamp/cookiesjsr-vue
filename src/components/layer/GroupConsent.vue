<script setup>
import TheSwitch from "@/components/ui/TheSwitch";
import BaseLinks from "@/components/ui/BaseLinks";
</script>

<template>
  <li :class="['cookiesjsr-service', 'group-'+gid]">
    <div class="cookiesjsr-service--description">
      <h3 v-trans>{{ header }}</h3>
      <BaseLinks :links="links" class="cookiesjsr-service--links" direction="row"/>
    </div>
    <div class="cookiesjsr-service--action">
      <TheSwitch v-if="groupNeedConsent"
        :title="(services[gid]) ? $t('allowed') : $t('denied')"
        :activated="groupIsEnabled"
        @change="(val) => { setConsent(val) }" />
      <div v-else class="cookiesjsr-service--always-on"><span v-trans>alwaysActive</span></div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ['gid', 'title'],
  data() {
    return {
      groupServices: '',
    }
  },
  computed: {
    ...mapGetters(['services', 'cookieDocs', 'serviceGroups']),
    header() {
      return (this.gid === 'default')
          ? this.$t('requiredCookies')
          : this.title;
    },
    links() {
      return (this.cookieDocs) ? [
            {href: this.$t('cookieDocsUri')  + "#" + this.gid, title: this.$t('cookieDocs'), attributes: {target: '_blank'}},
          ] : [];
    },
    groupNeedConsent() {
      let needConsent = false;
      for (let service_def of this.getGroupServices) {
        if (service_def['needConsent']) {
          needConsent = true;
        }
      }
      return needConsent;
    },
    getGroupServices() {
      if (typeof this.groupServices !== 'object') {
        this.groupServices = (
            typeof this.serviceGroups[this.gid] === 'object'
            && typeof this.serviceGroups[this.gid]['services'] === 'object'
        )
            ? this.serviceGroups[this.gid]['services']
            : this.groupServices = [];
      }
      return this.groupServices;
    },
    groupIsEnabled() {
      let enabled = false;
      for (let service_def of this.getGroupServices) {
        if (this.services[service_def['key']]) {
          enabled = true;
        }
      }
      return enabled;
    }
  },
  methods: {
    setConsent(val) {
      let services = {...this.services};
      for (let service_def of this.getGroupServices) {
        if (service_def['needConsent']) {
          services[service_def['key']] = val;
        }
      }
      this.$store.dispatch('setMultipleServices', services)
    }
  }
}
</script>
