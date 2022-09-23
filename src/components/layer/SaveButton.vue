<script setup>
import BaseButton from '@/components/ui/BaseButton';
</script>

<template>
    <BaseButton btnType="invert" @clicked="() => saveAndClose()">
      <slot/>
    </BaseButton>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters(['services', 'cookieName'])
  },
  methods: {
    saveAndClose() {
      this.$store.dispatch('setAllServices', {services: this.services});
      this.$store.dispatch('bannerClose');
      this.$store.dispatch('layerClose');
    }
  }
};

</script>
