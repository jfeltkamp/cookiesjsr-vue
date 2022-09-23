<template>
  <label
      :class="['cookiesjsr-switch', (activated) ? 'active':'']"
      :title="title"><input
          type="checkbox"
          @change="(e) => changed(e)"
          :checked="activated" /></label>
</template>

<script>
export default {
  emits: ['change'],
  props: ['activated', 'title'],
  methods: {
    changed(e) {
      console.log('##ev', e.target.checked);
      this.$emit('change', e.target.checked)
    }
  }
}
</script>
