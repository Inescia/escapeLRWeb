<template>
  <img :alt="text" :src="formatImageUrl" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppImage',
  props: {
    text: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
  },

  data() {
    return {}
  },

  computed: {
    formatImageUrl() {
      return new URL(`../assets/${this.source}`, import.meta.url).href
    },
  },
})
</script>
