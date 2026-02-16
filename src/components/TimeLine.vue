<template>
  <!-- DESKTOP -->
  <div v-if="!isMobile" class="flex flex-col h-[600px] relative w-5/6">
    <div
      ref="line"
      class="absolute bg-lightBlue :bg-white duration-[7000ms] ease-linear h-0.5 origin-left rounded-full scale-x-0 top-1/2 transition-transform w-full"
    />

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

  <!-- MOBILE -->
  <div v-else class="flex h-[1000px] relative w-screen">
    <div
      ref="line"
      class="absolute bg-lightBlue duration-[7000ms] ease-linear h-full left-[15%] origin-top rounded-full scale-y-0 transition-transform w-0.5"
    />

    <div
      v-for="({ mobileOffSet, position, title, visible }, index) in formattedEventList"
      :key="index"
      class="absolute flex justify-start translate-x-[18.5%] w-[81%]"
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
        <h4 class="rocknroll-one-regular bg-white capitalize m-0 text-left tracking-wider">
          {{ $t(title) }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    eventList: { type: Array, required: true },
  },

  data() {
    return {
      formattedEventList: [],
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
