<script setup>
  import ServiceGroup from "@/components/layer/ServiceGroup";
</script>

<template>
  <ul class="cookiesjsr-service-groups">
    <ServiceGroup v-for="group in serviceGroups" :key="group.id" v-bind="group" />
  </ul>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters(['serviceGroups'])
  }
}
</script>
