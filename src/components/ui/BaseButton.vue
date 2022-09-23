<template>
  <button :disabled="disabled" :class="['cookiesjsr-btn', btnType]" @click.prevent="clicked"><slot /></button>
</template>

<script>
export default {
  props: ['disabled', 'btnType', 'clicked']
}
</script>