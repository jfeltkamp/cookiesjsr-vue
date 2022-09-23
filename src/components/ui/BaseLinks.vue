<template>
  <ul :class="['cookiesjsr-links', classes, (direction === 'row') ? 'links--row' : '']">
    <li v-for="(link, index) in links" :key="index"><a :href="link.href" @click.prevent="link.clicked">{{ link.title }}</a></li>
  </ul>
</template>

<script>
export default {
  props: ['classes', 'links', 'direction']
}
</script>