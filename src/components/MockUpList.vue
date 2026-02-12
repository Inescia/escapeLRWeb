<template>
  <!-- DESKTOP -->
  <div v-if="!isMobile" class="flex h-[600px] relative w-5/6">
    <AppImage
      ref="mockup"
      source="mockup2.png"
      text="Iphone mockup"
      class="h-2/3 overflow-hidden scale-y-1 transition-transform duration-2000"
    />
    <AppImage
      ref="mockup"
      source="mockup2.png"
      text="Iphone mockup"
      class="h-2/3 overflow-hidden scale-y-1 transition-transform duration-2000"
    />
    <AppImage
      ref="mockup"
      source="mockup2.png"
      text="Iphone mockup"
      class="h-2/3 overflow-hidden scale-y-1 transition-transform duration-2000"
    />
    <AppImage
      ref="mockup"
      source="mockup2.png"
      text="Iphone mockup"
      class="h-2/3 overflow-hidden scale-y-1 transition-transform duration-2000"
    />
    <AppImage
      ref="mockup"
      source="mockup2.png"
      text="Iphone mockup"
      class="h-2/3 overflow-hidden scale-y-1 transition-transform duration-2000"
    />
  </div>

  <!-- MOBILE -->
  <div v-else class="flex h-[1000px] mx-2 relative w-screen">
    <div
      ref="line"
      class="absolute bg-black duration-[7000ms] ease-linear h-full left-1/3 origin-top rounded-full scale-y-0 transition-transform w-0.5"
    />

    <!-- PROJECTS -->
    <div
      v-for="({ color, name, position, visible }, index) in formattedProjectList"
      :key="index"
      :class="`absolute flex w-1/3 justify-end items-center project--${color}`"
      :style="`top: ${name === 'glowUX' ? position + 2 : position}%`"
    >
      <div
        :class="[
          visible ? 'opacity-1' : 'opacity-0',
          'delay-1000 duration-1000 transition-all z-[2] mr-2',
        ]"
      >
        <button
          class="border-2 border-white duration-1000 ml-2 rounded-3xl"
          @click="$router.push({ name: 'project', params: { id: name } })"
        >
          <p class="mx-3 my-1 text-white text-xs tracking-wider">
            {{ $t(`PORTFOLIO.PROJECTS.${name}.NAME`) }}
          </p>
        </button>
      </div>
      <div
        :class="[
          visible ? 'scale-1 opacity-1' : 'scale-0 opacity-0',
          'point duration-500 h-2.5 rounded-full transform transition-all w-2.5 min-w-2.5 -mr-1.5',
        ]"
      />
    </div>

    <!-- EVENTS -->
    <div
      v-for="({ content, mobileOffSet, position, title, visible }, index) in formattedEventList"
      :key="index"
      class="absolute flex justify-start translate-x-1/2 w-2/3"
      :style="`top: ${mobileOffSet ? position + mobileOffSet : position}%`"
    >
      <div
        :class="[
          visible ? 'scale-1 opacity-1' : 'scale-0 opacity-0',
          'duration-500 h-2.5 rounded-full transform transition-all w-2.5 mt-2.5 mr-4 -ml-1 min-w-2.5 bg-lightBlue',
        ]"
      />
      <div
        :class="[
          visible ? 'opacity-1' : 'opacity-0',
          'delay-1000 duration-1000 transition-all z-[2]',
        ]"
      >
        <h4
          class="rocknroll-one-regular bg-white capitalize font-thin m-0 text-left tracking-wider"
        >
          {{ $t(title) }}
        </h4>
        <p v-if="content" class="bg-white m-0 md:mr-0 mr-2 tracking-wider">
          {{ $t(content) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AppImage from './AppImage.vue'

export default {
  components: { AppImage },
  props: {
    eventList: { type: Array, required: true },
    projectList: { type: Array, default: () => [] },
  },

  data() {
    return {
      formattedEventList: [],
      formattedProjectList: [],
    }
  },

  computed: {
    isMobile() {
      return window.innerWidth <= 1024
    },
  },

  mounted() {
    for (const event of this.eventList) {
      this.formattedEventList.push({ ...event, visible: false })
    }
    for (const project of this.projectList) {
      this.formattedProjectList.push({ ...project, visible: false })
    }
    //document.addEventListener('scroll', this.onScrollListener)
  },

  beforeUnmount() {
    //  document.removeEventListener('scroll', this.onScrollListener)
  },

  methods: {
    animate() {
      setTimeout(() => {
        if (this.isMobile) {
          this.$refs.line.classList.add('scale-y-1')
          this.$refs.line.classList.remove('scale-y-0')
        } else {
          this.$refs.mockup.classList.add('scale-y-1')
          this.$refs.mockup.classList.remove('scale-y-0')
        }
      }, 500)
    },

    onScrollListener() {
      const timeline = document.getElementById('timeline')
      const height = window.innerHeight
      const scroll = window.scrollY
      const itemCenter = timeline.offsetTop //+ timeline.clientHeight / 2;
      const isVisible = itemCenter > scroll && itemCenter < scroll + height

      if (isVisible) this.animate()
    },
  },
}
</script>
