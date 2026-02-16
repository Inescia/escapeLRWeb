<template>
  <footer
    class="bg-darkBlue border-t-2 border-t-beige bottom-0 flex flex-col font-thin gap-2 justify-between left-0 md:flex-row pb-1 pt-2 px-6 right-0 text-center z-10"
  >
    <div class="flex flex-1 gap-2 justify-center md:justify-start text-white">
      <a
        class="flex-1 hover:text-[#45c486] text-white text-sm flex gap-1 md:justify-start justify-center font-thin"
        href="https://ingenious-code-tech.web.app"
        target="_blank"
      >
        <img alt="Ingenious Code ! Logo" src="../assets/icons/ic.png" class="h-5" />
        Creations
      </a>
    </div>
    <div
      class="flex flex-2 flex-col gap-2 justify-center md:flex-row md:gap-4 md:text-white text-beige text-sm"
    >
      <a href="mailto:ingenious.code.tech@gmail.com" class="hover:cursor-pointer hover:text-beige">
        <FontAwesomeIcon :icon="faEnvelope" class="h-4 mr-1" />
        {{ mail }}
      </a>
      <a
        href="https://www.instagram.com/ingenious.code.tech/"
        target="_blank"
        class="hover:cursor-pointer hover:text-beige"
      >
        <FontAwesomeIcon :icon="faInstagram" class="h-4 mr-1" />
        {{ insta }}
      </a>
    </div>
    <div
      class="cursor-pointer flex-1 hover:text-beige md:text-right text-sm text-white tracking-wider"
      @click="$router.push('/legal')"
    >
      {{ $t('GLOBAL.LEGAL') }}
    </div>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

export default {
  name: 'AppFooter',
  components: { FontAwesomeIcon },
  data() {
    return {
      mail: 'ingenious.code.tech@gmail.com',
      insta: '@EscapeLR',
      faInstagram,
      faEnvelope,
    }
  },
}
</script>
