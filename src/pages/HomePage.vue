<template>
  <main>
    <div class="bg-darkBlue h-screen w-screen border-beige border-b-4">
      <AppImage
        class="opacity-20 h-screen object-cover w-screen pb-1 absolute"
        :source="`${isMobile ? 'bg' : 'bg'}.jpg`"
        text="Background"
      />
      <AppImage
        ref="mockup2"
        source="mockup2.png"
        text="Iphone mockup"
        class="h-2/3 right-[10%] bottom-[5%] absolute"
      />
      <AppImage
        ref="mockup1"
        source="mockup1.png"
        text="Iphone mockup"
        class="h-2/3 right-[23%] bottom-[10%] absolute"
      />
      <!-- SLOGAN -->
      <div ref="bg" class="duration-2000 opacity-0 transition-opacity">
        <div
          class="absolute flex flex-col gap-2 md:left-12 md:text-left md:bottom-16 text-center bottom-[15%]"
        >
          <span
            class="md:ml-8 mt-3 mx-1 rocknroll-one-regular text-white text-3xl tracking-widest whitespace-pre-line"
          >
            {{ $t('HOME.SLOGAN') }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-10 items-center mt-8 mb-4">
      <!-- INTRO -->
      <section>
        <p class="text-center text-lg">{{ $t('HOME.INTRO') }}</p>
        <div class="flex-row hidden lg:flex mt-4 mx-10">
          <KeyNumber
            ref="keyNumber"
            v-for="{ appendOperator, prependOperator, value, index } in keyNumberList"
            :key="value"
            :append-operator="appendOperator"
            :prepend-operator="prependOperator"
            :text="$t(`HOME.KEY_NUMBER_LIST[${index}]`)"
            :value="value"
          />
        </div>
      </section>

      <!-- CONCEPT -->
      <section id="concept">
        <SectionTitle :label="$t('HOME.TITLES.CONCEPT')" />
        <p class="text-center text-bold text-base">
          {{ $t('HOME.CONCEPT.TITLE') }}
        </p>
        <p class="text-center">{{ $t('HOME.CONCEPT.CONTENT[0]') }}</p>
        <div class="flex gap-1 justify-center lg:gap-12 my-4 w-screen">
          <div
            v-for="image in stampList"
            :key="image"
            class="duration-300 hover:animate-translate hover:-translate-y-4 md:w-44 rounded-full translate-y-0 w-20"
          >
            <AppImage :source="`${image}.png`" :text="`Stamp ${image}`" class="rounded-full" />
          </div>
        </div>
        <p class="text-center">{{ $t('HOME.CONCEPT.CONTENT[1]') }}</p>
        <AppImage
          source="tableau.png"
          text="Tableau comparatif"
          class="mx-auto mt-12 mb-6 h-[280px]"
        />
        <p class="text-center text-bold text-lg">{{ $t('HOME.CONCEPT.CONTENT[2]') }}</p>
      </section>

      <!-- DEROULEMENT -->
      <section id="progress" class="w-screen">
        <SectionTitle :label="$t('HOME.TITLES.PROGRESS')" />
        <TimeLine
          id="timeline"
          :event-list="eventList"
          class="mb-8 md:-mb-[220px] mt-16 m-auto pointer-events-none"
        />
        <p class="text-center">{{ $t('HOME.PROGRESS.CONTENT[0]') }}</p>
        <p class="text-center">{{ $t('HOME.PROGRESS.CONTENT[1]') }}</p>
        <div class="flex w-5/6 mx-auto gap-10 my-12">
          <AppImage
            v-for="value in 5"
            :key="value"
            ref="mockup"
            :source="`mockup${2 + value}.png`"
            text="Iphone mockup"
            class="h-2/3 overflow-hidden scale-y-1 transition-transform duration-2000"
          />
        </div>
        <p class="text-center text-bold">{{ $t('HOME.PROGRESS.CONTENT[2]') }}</p>
      </section>

      <!-- PARCOURS -->
      <section id="circuits">
        <SectionTitle :label="$t('HOME.TITLES.CIRCUITS')" />
        <p class="text-center text-bold text-base">
          {{ $t('HOME.CIRCUITS.TITLE') }}
        </p>
        <p class="text-center">{{ $t('HOME.CIRCUITS.CONTENT[0]') }}</p>
        <div class="flex flex-col items-center">
          <Carousel
            :autoplay="5000"
            :transition="1200"
            class="my-6 w-screen"
            height="450px"
            pause-autoplay-on-hover
            wrap-around
          >
            <Slide v-for="circuit in ['tours', 'richelieu', 'esclavage', 'nazis']" :key="circuit">
              <!--  <AppImage
                :source="`parcours-${circuit}.png`"
                :text="`Circuit ${circuit}`"
                class="object-contain"
              />-->
              <CircuitCard :circuit="circuit" />
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination class="-bottom-4" />
            </template>
          </Carousel>
        </div>
        <p class="text-center">{{ $t('HOME.CIRCUITS.CONTENT[1]') }}</p>
      </section>

      <!-- PUBLICS -->
      <section id="publics">
        <SectionTitle :label="$t('HOME.TITLES.PUBLICS')" />
        <p class="text-center text-bold text-base">
          {{ $t('HOME.PUBLICS.TITLE') }}
        </p>
        <p class="text-center">{{ $t('HOME.PUBLICS.CONTENT[0]') }}</p>
        <p class="text-center">{{ $t('HOME.PUBLICS.CONTENT[1]') }}</p>

        <div
          class="bg-lightBlue bg-opacity-50 bottom-8 md:bottom-10 md:py-2 my-12 h-24 overflow-hidden py-0 w-screen"
        >
          <swiper-container
            :slides-per-view="10"
            :autoplay="{ delay: 0, disableOnInteraction: false }"
            :freeMode="true"
            :freeModeMomentum="false"
            :loop="true"
            speed="2000"
            style="transition-timing-function: linear"
          >
            <swiper-slide v-for="image in skillList" :key="image">
              <div class="flex flex-col items-center">
                <AppImage
                  :source="`partnerns/${image}.png`"
                  :text="`Icon partnern ${image}`"
                  class="h-20 object-contain"
                />
                <span
                  class="font-bold hidden md:block mt-2 text-white text-xs tracking-widest whitespace-nowrap"
                  >{{ image }}</span
                >
              </div>
            </swiper-slide>
          </swiper-container>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import { register } from 'swiper/element/bundle'
import AppImage from '@/components/AppImage.vue'
import KeyNumber from '@/components/KeyNumber.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { EVENT_LIST, KEY_NUMBER_LIST, STAMP_LIST } from '@/data/global'
import { formatImageUrl } from '@/data/helpers'
import TimeLine from '@/components/TimeLine.vue'
import CircuitCard from '@/components/CircuitCard.vue'

export default {
  name: 'HomePage',
  components: {
    CircuitCard,
    AppImage,
    Carousel,
    KeyNumber,
    Navigation,
    Pagination,
    SectionTitle,
    Slide,
    TimeLine,
  },

  data() {
    return {
      eventList: Object.freeze(EVENT_LIST),
      keyNumberList: Object.freeze(KEY_NUMBER_LIST),
      stampList: Object.freeze(STAMP_LIST),
    }
  },

  computed: {
    isMobile() {
      return window.innerWidth <= 768
    },
  },

  created() {
    register()
  },

  mounted() {
    document.addEventListener('scroll', this.onScrollListener)

    setTimeout(() => {
      this.$refs.bg.classList.remove('opacity-0')
      this.$refs.bg.classList.add('opacity-100')
    }, 200)
  },

  beforeUnmount() {
    document.removeEventListener('scroll', this.onScrollListener)
  },

  methods: {
    formatImageUrl,

    animateKeyNumber(index) {
      if (index == 10) return
      const item = this.$refs[`keyNumber${index}`][0]
      item.animate()
    },

    /**
     * @method onScrollListener to change the display of the navBar and launch the keyNumbers animation (callback on scroll listener)
     */
    onScrollListener() {
      this.$refs.keyNumber.forEach((item) => {
        const height = window.innerHeight,
          itemCenter = item.$el.offsetTop + item.$el.clientHeight / 2,
          scroll = window.scrollY
        const isVisible = itemCenter > scroll && itemCenter < scroll + height

        if (isVisible && !item.progressValue) item.animate()
      })

      let scrollY = window.scrollY
      this.$refs.mockup1.$el.style.transform = `translateY(${scrollY * -0.3}px)`
      this.$refs.mockup2.$el.style.transform = `translateY(${scrollY * -0.5}px)`
    },
  },
}
</script>

<style lang="scss">
@use '../theme/colors.scss' as colors;

.carousel__next,
.carousel__prev {
  color: map-get(colors.$colors, 'lightBlue');
}

.carousel__next:hover,
.carousel__prev:hover {
  color: map-get(colors.$colors, 'beige');
}

.carousel__pagination-button {
  height: 7px;
  width: 7px;
  border-radius: 5px;
  background-color: map-get(colors.$colors, 'lightBlue');
}
.carousel__pagination-button--active {
  background-color: map-get(colors.$colors, 'beige');
}
</style>
