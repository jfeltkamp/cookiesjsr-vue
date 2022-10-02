<script setup>
import TheSwitch from "@/components/ui/TheSwitch";
import BaseLinks from "@/components/ui/BaseLinks";
</script>

<template>
  <li :class="['cookiesjsr-service']">
    <div class="cookiesjsr-service--description">
      <h3>{{ service.name }}</h3>
      <BaseLinks :links="links" class="cookiesjsr-service--links" direction="row"/>
    </div>
    <div class="cookiesjsr-service--action">
      <TheSwitch v-if="service.needConsent"
          :key="service.key"
          :title="(services[service.key]) ? $t('allowed') : $t('denied')"
          :activated="services[service.key]"
          @change="(val) => setService(service.key, val)" />
      <div v-else class="cookiesjsr-service--always-on"><span v-trans>alwaysActive</span></div>
    </div>
  </li>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['service'],
  computed: {
    ...mapGetters(['cookieDocs', 'services']),
    links() {
      const links = [];
      if (typeof this.service.uri !== "undefined" && this.service.uri)
        links.push({href: this.service.uri, title: this.$t('officialWebsite')});
      if (this.service.cookieDocs)
        links.push({ href: this.$t('cookieDocsUri') + "#" + this.service.key, title: this.$t('cookieDocs'), attributes: {target: '_blank'} });
      return links;
    }
  },
  methods: {
    setService(service, val) {
      this.$store.dispatch('setService', {
        service: service,
        value: val,
      })
    },
  }
}
</script>
