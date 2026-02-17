<template>
  <!-- DESKTOP VERSION -->
  <nav id="nav-bar__container" class="fixed hidden justify-between lg:flex top-0 w-screen z-10">
    <!-- Logo -->
    <RouterLink to="/">
      <img
        alt="Logo extended Escape LR"
        class="absolute h-20 ml-4 my-2"
        src="../assets/logo extended.png"
      />
    </RouterLink>

    <div class="flex gap-2 items-end mb-2 mr-4 h-20 self-end">
      <!-- Categories -->
      <div v-for="(header, index) in headerList" :key="index" class="group">
        <div @click="redirect(header)">
          <h5
            :class="`category cursor-pointer ${currentPage === header ? 'text-beige current-page' : ''}`"
          >
            {{ $t(`HOME.TITLES.${header.toUpperCase()}`) }}
          </h5>
          <div
            :class="`bg-beige duration-500 group-hover:w-2/5 h-0.5 mx-auto mt-4 rounded-full transition-width w-0`"
          />
        </div>
      </div>
      <!-- Language
      <img
        v-if="$i18n.locale === 'fr'"
        alt="french flag"
        src="../assets/icons/fr.png"
        class="cursor-pointer size-6 mt-4 mx-2 self-center"
        @click="toggleLangage"
      />
      <img
        v-else
        alt="english flag"
        src="../assets/icons/en.png"
        class="cursor-pointer size-6 mt-4 mx-2 self-center"
        @click="toggleLangage"
      />-->
    </div>
  </nav>

  <!-- MOBILE VERSION -->
  <nav class="fixed lg:hidden top-0 w-screen z-10">
    <div class="bg-darkBlue flex h-16 justify-between">
      <RouterLink class="duration-500 transition-opacity" to="/">
        <img
          alt="Logo extended Escape LR"
          class="h-12 ml-2 my-2"
          src="../assets/logo extended.png"
        />
      </RouterLink>

      <div
        class="cursor-pointer flex flex-col h-8 justify-between mx-3 my-4 self-start w-10 z-20"
        @click="toggleMenu"
      >
        <div id="line-top" class="bg-blue duration-500 h-[3px] rounded-full w-full" />
        <div id="line-center" class="bg-lightBlue duration-500 h-[3px] rounded-full w-full" />
        <div id="line-bottom" class="bg-blue duration-500 h-[3px] rounded-full w-full" />
      </div>
    </div>
    <transition name="slide-down-up">
      <div
        v-if="isOpen"
        class="bg-darkBlue border-beige border-t-2 cursor-pointer flex flex-col gap-3 py-3 relative w-screen"
      >
        <div v-for="(header, index) in headerList" :key="index">
          <div @click="redirect(header)">
            <span
              :class="`rocknroll-one-regular mx-4 my-6 text-sm tracking-widest ${currentPage === header ? 'text-beige' : 'text-white'}`"
            >
              {{ $t(`HOME.TITLES.${header.toUpperCase()}`) }}
            </span>
          </div>
        </div>

        <!-- Language
        <div class="absolute flex gap-4 right-4 top-4">
          <img
            v-if="$i18n.locale === 'fr'"
            alt="french flag"
            src="../assets/icons/fr.png"
            class="h-5"
            @click="toggleLangage"
          />
          <img
            v-else
            alt="english flag"
            src="../assets/icons/en.png"
            class="h-5"
            @click="toggleLangage"
          />
        </div> -->
      </div>
    </transition>
  </nav>
</template>

<script>
import { defineComponent } from 'vue'
import { HEADER_LIST } from '../data/global'

export default defineComponent({
  name: 'AppNavBar',
  data() {
    return {
      headerList: Object.freeze(HEADER_LIST),
      isOpen: false,
      currentPage: '',
    }
  },

  mounted() {
    setTimeout(() => this.onScrollListener(), 0)
    window.addEventListener('scroll', this.onScrollListener)
    this.updateCurrentPage()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScrollListener)
  },

  methods: {
    /**
     * @method to change the text color and the icon opacity according to the scroll value (callback on scroll listener)
     */
    onScrollListener() {
      this.updateCurrentPage()
      const height = window.innerHeight
      const margin = 50
      const scroll = window.scrollY
      const containerRef = document.getElementById('nav-bar__container')
      const categoryRefList = Array.from(document.getElementsByClassName('category'))

      const colors = {
        white: 'rgb(255, 255, 255)',
        black: 'rgb(30, 32, 30)',
        beige: 'rgb(234, 199, 159)',
      }

      if (scroll < height - margin || this.isDark) {
        containerRef.style.backgroundColor = 'transparent'
        categoryRefList.forEach((category) => {
          if (category instanceof HTMLElement)
            category.style.color = category.classList.contains('current-page')
              ? colors.beige
              : colors.white
        })
      } else if (scroll < height + margin) {
        const color1 = colors.white.split('(')[1].split(')')[0].split(', ').map(Number)
        const color2 = colors.black.split('(')[1].split(')')[0].split(', ').map(Number)

        const value = (scroll - height + margin) / (2 * margin)
        const rgb = color1.map((c, index) => Math.round(c * (1 - value) + color2[index] * value))

        const values = {
          opacity: value,
          color: `rgb(${rgb.join(', ')})`,
        }

        containerRef.style.backgroundColor = `rgba(255, 255, 255, ${value * 0.2})`
        categoryRefList.forEach((category) => {
          if (category instanceof HTMLElement)
            category.style.color = category.classList.contains('current-page')
              ? colors.beige
              : values.color
        })
      } else {
        containerRef.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
        categoryRefList.forEach((category) => {
          if (category instanceof HTMLElement)
            category.style.color = category.classList.contains('current-page')
              ? colors.beige
              : colors.black
        })
      }
    },

    /**
     * @method to redirect to the selected category
     * @param {string} link
     */
    redirect(link) {
      this.$router.push({ path: '/', hash: `#${link}` })
      if (this.isOpen) this.toggleMenu()
    },

    /**
     * @method to change the current language
     */
    toggleLangage() {
      const langageList = this.$i18n.availableLocales
      const oldIndex = langageList.findIndex((item) => item === this.$i18n.locale)
      const newIndex = oldIndex + 1 >= langageList.length ? 0 : oldIndex + 1
      this.$i18n.locale = langageList[newIndex]
    },

    /**
     * @method to close/open the menu and launch the icon animation
     */
    toggleMenu() {
      this.isOpen = !this.isOpen

      const lineTop = document.getElementById('line-top')
      const lineCenter = document.getElementById('line-center')
      const lineBottom = document.getElementById('line-bottom')

      if (this.isOpen) {
        lineTop.style.transform = 'translateX(15px) rotate(45deg) translateY(20px)'
        lineCenter.style.opacity = '0'
        lineBottom.style.transform = 'translateX(15px) rotate(-45deg) translateY(-20px)'
      } else {
        lineTop.style.transform = 'rotate(0deg)'
        lineCenter.style.opacity = '1'
        lineBottom.style.transform = 'rotate(0deg)'
      }
    },

    /**
     * @method to update current page based on scroll position
     */
    updateCurrentPage() {
      for (const header of ['hero', ...this.headerList]) {
        const element = document.getElementById(header)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 4) {
            this.currentPage = header
          }
        }
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.slide-down-up-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-up-enter-active {
  transition: all 0.6s ease-out;
}

.slide-down-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-up-leave-active {
  transition: all 0.6s ease-out;
}

.slide-down-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
