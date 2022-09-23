<script setup>
import BaseButton from "@/components/ui/BaseButton";
</script>

<template>
  <BaseButton
      :clicked="() => setAllSaveAndClose()"
      :classes="classes"><slot/></BaseButton>
</template>

<script>
export default {
  props: ['classes', 'setAll'],
  computed: {
    services() {
      return this.$store.getters['services']
    }
  },
  methods: {
    setAllSaveAndClose() {
      let services = {...this.services};
      for (let id in services) {
        if (typeof services[id] !== 'undefined') {
          services[id] = this.setAll;
        }
      }
      this.$store.dispatch('setAllServices', {services: services});
      this.$store.dispatch('bannerClose');
      this.$store.dispatch('layerClose');
    }
  }
}
</script>