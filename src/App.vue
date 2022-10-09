<script setup>
import TheBanner from '@/components/TheBanner';
import TheLayer from '@/components/TheLayer';
</script>

<template>
  <div class="cookiesjsr--app">
    <TheBanner v-if="bannerVisible"/>
    <TheLayer v-if="layerOpen"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  methods: {
    hashChangeHandler() {
      if (window.location.hash === this.openSettingsHash) {
        this.$store.dispatch('layerOpen');
      }
    }
  },
  computed: {
    ...mapGetters(['openSettingsHash', 'layerOpen', 'bannerVisible']),
  },
  created() {
    // Behavior Layer open: initial look-up for the hash, if Layer should open.
    this.hashChangeHandler();
    // Define this as me.
    const self = this;

    // Behavior Layer open: Listen to hash changes not initialized by link click.
    window.addEventListener("hashchange", () => { self.hashChangeHandler() }, false);

    // Behavior Layer open: Listen to clicks on opener link click (avoid to change the location.hash).
    const selector = 'a[href="%hash"]'.replace('%hash', self.openSettingsHash);
    const openLinks = document.querySelectorAll(selector);
    for (let link of openLinks) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        self.$store.dispatch('layerOpen');
      });
    }

  }
}
</script>
