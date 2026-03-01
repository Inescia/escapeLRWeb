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
        class="md:h-2/3 h-1/2 right-[10%] md:bottom-[5%] bottom-[15%] absolute"
      />
      <AppImage
        ref="mockup1"
        source="mockup1.png"
        text="Iphone mockup"
        class="md:h-2/3 h-1/2 right-[23%] md:bottom-[10%] bottom-[20%] absolute"
      />
      <div class="absolute top-[40%] left-[25%]">
        <AppButton
          :is-animated="false"
          :label="$t('GLOBAL.BEGIN')"
          @click="$router.push({ path: '/', hash: `#circuits` })"
        />
        <img
          src="../assets/icons/arrow.png"
          alt="Arrow icon"
          class="animate-bounce w-2 md:w-10 mt-4 mx-auto object-contain"
        />
      </div>
      <!-- SLOGAN -->
      <div ref="bg" class="duration-2000 opacity-0 transition-opacity">
        <div class="absolute md:left-12 left-3 text-left md:bottom-16 bottom-10">
          <span
            class="mt-3 rocknroll-one-regular text-white md:text-3xl tracking-widest whitespace-pre-line"
          >
            {{ $t('HOME.SLOGAN') }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-10 items-center mt-8 mb-4">
      <!-- INTRO -->
      <section id="hero">
        <p class="md:text-lg text-base">{{ $t('HOME.INTRO') }}</p>
        <div class="flex flex-col md:flex-row justify-around lg:flex mt-4 mx-10">
          <KeyNumber
            ref="keyNumber"
            v-for="({ appendOperator, prependOperator, value }, index) in keyNumberList"
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
        <p class="text-bold text-base">
          {{ $t('HOME.CONCEPT.TITLE') }}
        </p>
        <p>{{ $t('HOME.CONCEPT.CONTENT[0]') }}</p>
        <div class="flex gap-1 justify-center lg:gap-12 my-4 w-screen">
          <div
            v-for="image in stampList"
            :key="image"
            class="duration-300 hover:animate-translate hover:-translate-y-4 md:w-44 rounded-full translate-y-0 w-20"
          >
            <AppImage :source="`${image}.png`" :text="`Stamp ${image}`" class="rounded-full" />
          </div>
        </div>
        <p>{{ $t('HOME.CONCEPT.CONTENT[1]') }}</p>
        <AppImage
          source="tableau.png"
          text="Tableau comparatif"
          class="mx-auto md:mt-12 md:mb-6 my-0 h-[280px] object-contain"
        />
        <p class="text-bold text-lg">{{ $t('HOME.CONCEPT.CONTENT[2]') }}</p>
      </section>

      <!-- DEROULEMENT -->
      <section id="progress" class="w-screen">
        <SectionTitle :label="$t('HOME.TITLES.PROGRESS')" />
        <TimeLine
          id="timeline"
          :event-list="eventList"
          class="mb-8 md:-mb-[220px] mt-16 m-auto pointer-events-none"
        />
        <p class="text-bold">{{ $t('HOME.PROGRESS.CONTENT[0]') }}</p>
        <p>{{ $t('HOME.PROGRESS.CONTENT[1]') }}</p>
        <p class="text-bold">{{ $t('HOME.PROGRESS.CONTENT[2]') }}</p>
        <p>{{ $t('HOME.PROGRESS.CONTENT[3]') }}</p>
        <div class="flex w-full px-[10%] gap-8 my-12 md:overflow-auto overflow-scroll">
          <AppImage
            v-for="value in 5"
            :key="value"
            ref="mockup"
            :source="`mockup${2 + value}.png`"
            text="Iphone mockup"
            class="md:h-2/3 h-[400px] md:overflow-hidden hover:scale-100 duration-300 scale-90"
          />
        </div>
        <p>{{ $t('HOME.PROGRESS.CONTENT[4]') }}</p>
        <p>{{ $t('HOME.PROGRESS.CONTENT[5]') }}</p>
        <p class="text-bold">{{ $t('HOME.PROGRESS.CONTENT[6]') }}</p>
        <p>{{ $t('HOME.PROGRESS.CONTENT[7]') }}</p>
      </section>

      <!-- PARCOURS -->
      <section id="circuits">
        <SectionTitle :label="$t('HOME.TITLES.CIRCUITS')" />
        <p class="text-bold text-base">
          {{ $t('HOME.CIRCUITS.TITLE') }}
        </p>
        <p>{{ $t('HOME.CIRCUITS.CONTENT[0]') }}</p>
        <div class="flex flex-col items-center">
          <Carousel
            :autoplay="5000"
            :transition="1200"
            class="my-6 w-screen"
            pause-autoplay-on-hover
            wrap-around
          >
            <Slide
              v-for="circuit in ['tours', 'richelieu', 'esclavage', 'nazis']"
              :key="circuit"
              class="md:h-[500px] h-90vh"
            >
              <CircuitCard :circuit="circuit" />
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination class="-bottom-4" />
            </template>
          </Carousel>
        </div>
        <p>{{ $t('HOME.CIRCUITS.CONTENT[1]') }}</p>
      </section>

      <!-- PUBLICS -->
      <section id="publics">
        <SectionTitle :label="$t('HOME.TITLES.PUBLICS')" />
        <div class="flex flex-col items-center">
          <p class="text-bold text-base">
            {{ $t('HOME.PUBLICS.TITLE') }}
          </p>
          <p>{{ $t('HOME.PUBLICS.CONTENT[0]') }}</p>
          <div class="flex justify-center flex-col md:flex-row md:gap-16 gap-10 my-2">
            <div class="flex flex-col justify-between items-center gap-2">
              <img src="../assets/icons/touriste.png" alt="Duration icon" class="w-24" />
              <span class="text-blue quicksand-bold text-lg">{{ $t('HOME.PUBLICS.LIST[0]') }}</span>
            </div>
            <div class="flex flex-col justify-between items-center gap-2">
              <img src="../assets/icons/famille.png" alt="Distance icon" class="w-24" />
              <span class="text-blue quicksand-bold text-lg">{{ $t('HOME.PUBLICS.LIST[1]') }}</span>
            </div>
            <div class="flex flex-col justify-between items-center gap-2">
              <img src="../assets/icons/amis.png" alt="Level icon" class="w-24" />
              <span class="text-blue quicksand-bold text-lg">{{ $t('HOME.PUBLICS.LIST[2]') }}</span>
            </div>
            <div class="flex flex-col justify-between items-center gap-2">
              <img src="../assets/icons/habitants.png" alt="Level icon" class="w-24" />
              <span class="text-blue quicksand-bold text-lg">{{ $t('HOME.PUBLICS.LIST[3]') }}</span>
            </div>
            <div class="flex flex-col justify-between items-center gap-2">
              <img src="../assets/icons/scolaires.png" alt="Level icon" class="w-24" />
              <span class="text-blue quicksand-bold text-lg">{{ $t('HOME.PUBLICS.LIST[4]') }}</span>
            </div>
          </div>
          <p>{{ $t('HOME.PUBLICS.CONTENT[1]') }}</p>

          <div
            class="bg-lightBlue bg-opacity-50 bottom-8 md:bottom-10 md:py-2 my-8 h-24 overflow-hidden py-0 w-screen"
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
          <AppButton :label="$t('GLOBAL.CONTACT')" class="mb-6" @click="openEmail()" />
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
import AppButton from '@/components/AppButton.vue'

export default {
  name: 'HomePage',
  components: {
    CircuitCard,
    AppButton,
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

    openEmail() {
      window.location.href = 'mailto:ingenious.code.tech@gmail.com'
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
@use 'sass:map';

.carousel__next,
.carousel__prev {
  color: map.get(colors.$colors, 'lightBlue');
}

.carousel__next:hover,
.carousel__prev:hover {
  color: map.get(colors.$colors, 'beige');
}

.carousel__pagination-button {
  height: 7px;
  width: 7px;
  border-radius: 5px;
  background-color: map.get(colors.$colors, 'lightBlue');
}
.carousel__pagination-button--active {
  background-color: map.get(colors.$colors, 'beige');
}
</style>
