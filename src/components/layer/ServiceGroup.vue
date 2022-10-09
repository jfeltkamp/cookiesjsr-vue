<script setup>
import SingleService from "@/components/layer/SingleService";
import GroupConsent from "@/components/layer/GroupConsent";
</script>

<template>
  <li :class="['cookiesjsr-service-group', (id === activeGroup) ? 'active': '']">
    <button class="cookiesjsr-service-group--tab" role="tab"
            :id="'tab-' + id"
            :aria-selected="(id === activeGroup) ? 'true' : 'false'"
            :tabIndex="(id === activeGroup) ? '0' : '-1'"
            :aria-controls="'panel-' + id"
            @click.prevent="() => setActiveGroup(id)"
            v-trans>{{ id + '.title' }}</button>
    <div class="cookiesjsr-service-group--content"
         :id="'panel-' + id" role="tabpanel"
         :aria-labelledby="'tab-' + id"
         :hidden="(id !== activeGroup)">
      <div class="cookiesjsr-service-group--intro"
           v-trans>{{ id + '.details' }}</div>
      <ul class="cookiesjsr-service-group--services">
        <GroupConsent v-if="groupConsent" :key="id" :gid="id" :title="id + '.title'" />
        <SingleService v-else v-for="service in services" :key="service.key" :service="service"/>
      </ul>
    </div>
  </li>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: ['id', 'services'],
  computed: {
    ...mapGetters(['groupConsent', 'activeGroup']),
  },
  methods: {
    setActiveGroup(group) {
      this.$store.dispatch('setActiveGroup', {activeGroup: group})
    },
  }
}
</script>