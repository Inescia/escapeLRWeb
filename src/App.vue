<template>
  <div class="flex flex-col min-h-screen">
    <AppNavBar ref="navBar" />
    <RouterView />
    <AppFooter />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
import AppNavBar from './components/AppNavBar.vue'

export default {
  name: 'App',
  components: { AppFooter, AppNavBar, RouterView },

  mounted() {
    document.addEventListener('scroll', this.$refs.navBar.onScrollListener)
  },

  beforeUnmount() {
    document.removeEventListener('scroll', this.$refs.navBar.onScrollListener)
  },
}
</script>
