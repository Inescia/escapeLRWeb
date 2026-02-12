<template>
  <!-- DESKTOP -->
  <div v-if="!isMobile" class="flex flex-col h-[600px] relative w-5/6">
    <div
      ref="line"
      class="absolute bg-lightBlue :bg-white duration-[7000ms] ease-linear h-0.5 origin-left rounded-full scale-x-0 top-1/2 transition-transform w-full"
    />

    <!-- EVENTS -->
    <div class="flex-1">
      <div
        v-for="({ content, position, size, title, visible }, index) in formattedEventList"
        :key="index"
        class="absolute flex flex-col h-1/2 justify-end"
        :style="`left: ${position}%`"
      >
        <div
          :class="[
            visible ? 'opacity-1' : 'opacity-0',
            'delay-1000 duration-1000 transition-all z-[2]',
          ]"
        >
          <h4 class="rocknroll-one-regular bg-white capitalize font-thin m-0 text-left">
            {{ $t(title) }}
          </h4>
          <p v-if="content" class="bg-white m-0 tracking-wider">
            {{ $t(content) }}
          </p>
        </div>
        <div
          :class="[
            visible ? 'opacity-1 scale-y-1' : 'opacity-0 scale-y-0',
            size === 'small' ? 'h-10' : size === 'medium' ? ' h-2/5' : ' h-2/3',
            'duration-1000 transition-all w-0.5 ml-1 my-1.5 rounded-full delay-300 bg-lightBlue',
          ]"
        />

        <div
          :class="[
            visible ? 'scale-1 opacity-1' : 'scale-0 opacity-0',
            'duration-500 h-2.5 rounded-full transform transition-all w-2.5 -mb-1.5 bg-lightBlue',
          ]"
        />
      </div>
    </div>

    <!-- PROJECTS -->
    <div class="flex-1">
      <div
        v-for="({ color, name, position, size, visible }, index) in formattedProjectList"
        :key="index"
        :class="`absolute flex flex-col h-1/2 justify-start project--${color}`"
        :style="`left: ${position}%`"
      >
        <div
          :class="[
            visible ? 'scale-1 opacity-1' : 'scale-0 opacity-0',
            'line duration-500 h-2.5 rounded-full transform transition-all w-2.5 -mt-1',
          ]"
        />
        <div
          :class="[
            visible ? 'opacity-1 scale-y-1' : 'opacity-0 scale-y-0',
            size === 'small' ? 'h-7' : size === 'medium' ? ' h-1/3' : ' h-2/3',
            'point duration-1000 transition-all w-0.5 ml-1 my-1.5 rounded-full delay-300',
          ]"
        />
        <div
          :class="[
            visible ? 'opacity-1' : 'opacity-0',
            '-translate-x-1/2 delay-1000 duration-1000 transition-all z-[2] -mt-1',
          ]"
        >
          <button
            class="border-4 border-white cursor-pointer duration-1000 hover:-translate-y-2 ml-2 rounded-full transition-trasnsform"
            @click="$router.push({ name: 'portfolio' })"
          >
            <p class="mx-4 my-2 text-white tracking-wider whitespace-nowrap">
              {{ $t(`PORTFOLIO.PROJECTS.${name}.NAME`) }}
            </p>
          </button>
        </div>
      </div>
    </div>
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
export default {
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
    document.addEventListener('scroll', this.onScrollListener)
  },

  beforeUnmount() {
    document.removeEventListener('scroll', this.onScrollListener)
  },

  methods: {
    animateTimeline() {
      setTimeout(() => {
        if (this.isMobile) {
          this.$refs.line.classList.add('scale-y-1')
          this.$refs.line.classList.remove('scale-y-0')
        } else {
          this.$refs.line.classList.add('scale-x-1')
          this.$refs.line.classList.remove('scale-x-0')
        }
      }, 500)

      this.formattedEventList.forEach((event, index) => {
        setTimeout(
          () => (this.formattedEventList[index] = { ...event, visible: true }),
          event.position * 80,
        )
      })

      this.formattedProjectList.forEach((event, index) => {
        setTimeout(
          () => (this.formattedProjectList[index] = { ...event, visible: true }),
          event.position * 80,
        )
      })
    },

    onScrollListener() {
      const timeline = document.getElementById('timeline')
      const height = window.innerHeight
      const scroll = window.scrollY
      const itemCenter = timeline.offsetTop //+ timeline.clientHeight / 2;
      const isVisible = itemCenter > scroll && itemCenter < scroll + height

      if (isVisible) this.animateTimeline()
    },
  },
}
</script>
