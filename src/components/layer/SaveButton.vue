<script setup>
import BaseButton from '@/components/ui/BaseButton';
</script>

<template>
    <BaseButton btnType="invert important save dialog-last-tab" @click.prevent="saveAndClose">
      <slot/>
    </BaseButton>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters(['services'])
  },
  methods: {
    saveAndClose() {
      this.$scs.setServices(this.services);
      this.$store.dispatch('setAllServices', {services: this.services});
      this.$store.dispatch('bannerClose');
      this.$store.dispatch('layerClose');
    }
  }
};
</script>
