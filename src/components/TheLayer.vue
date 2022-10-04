<script setup>
import SetAllServices from '@/components/ui/SetAllServices';
import SaveButton from "@/components/layer/SaveButton";
import ServiceGroups from "@/components/layer/ServiceGroups";
</script>

<template>
  <div v-if="layerOpen" class="cookiesjsr-layer--wrapper">
    <div class="cookiesjsr-layer--overlay" :title="$t('close')" @click.prevent="() => this.props.closeLayer()" />
    <div class="cookiesjsr-layer">
      <header class="cookiesjsr-layer--header">
        <span class="cookiesjsr-layer--title" v-trans>cookieSettings</span>
        <div class="cookiesjsr-layer--close" :title="$t('close')" @click.prevent="() => this.props.closeLayer()"/>
      </header>
      <div class="cookiesjsr-layer--body">
        <ServiceGroups/>
      </div>
      <footer class="cookiesjsr-layer--footer">
        <div class="cookiesjsr-layer--label-all" v-trans>settingsAllServices</div>
        <div class="cookiesjsr-layer--actions">
          <SetAllServices v-if="showDenyAll" btnType="invert denyAll" :setAll="false" v-trans>denyAll</SetAllServices>
          <SaveButton v-trans>saveSettings</SaveButton>
          <SetAllServices btnType="invert important" :setAll="true" v-trans>acceptAll</SetAllServices>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['showDenyAll', 'layerOpen'])
  }
}
</script>