<script setup>
  import ServiceGroup from "@/components/layer/ServiceGroup";
</script>

<template>
  <ul class="cookiesjsr-service-groups"
      role="tablist"
      :aria-label="$t('cookieSettings')" >
    <ServiceGroup v-for="group in serviceGroups" :key="group.id" v-bind="group" />
  </ul>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters(['serviceGroups', 'activeGroup'])
  },
  methods: {
    tabsUpDown(event) {
      let direction = 0;
      switch (event.key) {
        case 'ArrowUp':
          direction = -1;
          break;
        case 'ArrowDown':
          direction = 1;
          break;
        default:
      }
      if (direction !== 0) {
        let list = [];
        for (let sgid in this.serviceGroups) { list.push(sgid) }
        const currentTab = list.indexOf(this.activeGroup);
        let newTab = currentTab + direction;
        newTab = (newTab > list.length - 1) ? 0 : newTab;
        newTab = (newTab < 0) ? list.length - 1 : newTab;
        this.$store.dispatch('setActiveGroup', {activeGroup: list[newTab]});
      }
    }
  },
  created() {
    window.addEventListener("keydown", this.tabsUpDown)
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.tabsUpDown)
  }

}
</script>
