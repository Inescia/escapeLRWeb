<template>
  <div class="perspective w-[350px] h-[500px]">
    <div
      class="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
      :class="{ 'rotate-y-180': isFlipped }"
      @click.prevent="isFlipped = !isFlipped"
    >
      <!-- Face avant -->
      <div
        class="absolute w-full h-full bg-white rounded-2xl shadow-3xl backface-hidden overflow-hidden flex flex-col flex-between"
      >
        <img :src="imageList[circuit]" alt="illustration" class="w-full p-2 object-cover" />

        <p
          class="text-darkBlue hidden rocknroll-one-regular text-base text-widest text-center m-2 -mt-2"
        >
          {{ circuitData.price }} / Joueur
        </p>
        <div
          :class="[
            pricePositionClass,
            `absolute size-[80px] flex justify-center items-center bg-[url('../assets/icons/cire.png')] bg-no-repeat bg-contain object-cover`,
          ]"
        >
          <span class="text-white rocknroll-one-regular text-xl mb-1">
            {{ circuitData.price }}*</span
          >
        </div>
        <div class="flex-1 flex flex-col justify-between mt-2">
          <div class="flex justify-center md:gap-10 gap-4">
            <div class="flex flex-col justify-between items-center gap-2">
              <img src="../assets/icons/duration.png" alt="Duration icon" class="md:w-10 w-8" />
              <span class="text-blue quicksand-bold">{{ circuitData.duration }}</span>
            </div>
            <div class="flex flex-col justify-between items-center gap-2">
              <img src="../assets/icons/distance.png" alt="Distance icon" class="md:w-10 w-8" />
              <span class="text-blue quicksand-bold">{{ circuitData.distance }}</span>
            </div>
            <div class="flex flex-col justify-between items-center gap-2">
              <img :src="levelIcons[circuit]" alt="Level icon" class="md:w-10 w-8" />
              <span class="text-blue quicksand-bold">{{ circuitData.level }}</span>
            </div>
          </div>

          <div class="flex flex-row items-center justify-between mx-2 mb-1">
            <AppButton :is-animated="false" :label="$t('GLOBAL.BUY_CODE')" @click="goToStripe" />
            <AppButton :is-animated="false" bg-color="bg-blue" label="+ d'info" />
          </div>
        </div>
      </div>

      <!-- Face arrière -->
      <div
        class="absolute w-full h-full bg-white rounded-2xl shadow-3xl backface-hidden rotate-y-180 flex flex-col justify-between items-center"
      >
        <h2 class="text-darkBlue text-lg rocknroll-one-regular mt-6 mb-0 text-center">
          {{ $t(`CIRCUITS.${circuit.toUpperCase()}.NAME`) }}
        </h2>
        <p class="text-darkBlue text-xs p-4 m-0">
          {{ $t(`CIRCUITS.${circuit.toUpperCase()}.DESCRIPTION`) }}
        </p>
        <div class="flex flex-row items-center justify-between mx-2 mb-1">
          <AppButton :is-animated="false" :label="$t('GLOBAL.BUY_CODE')" @click="goToStripe" />
          <AppButton :is-animated="false" bg-color="bg-blue" label="- d'info" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { CIRCUITS } from '@/data/circuits.js'
import AppButton from '@/components/AppButton.vue'
import tours from '../assets/circuits/parcours-tours.png'
import richelieu from '../assets/circuits/parcours-richelieu.png'
import esclavage from '../assets/circuits/parcours-esclavage.png'
import nazis from '../assets/circuits/parcours-nazis.png'
import level1 from '../assets/icons/level1.png'
import level2 from '../assets/icons/level2.png'
import level3 from '../assets/icons/level3.png'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Card',
  components: { AppButton },
  props: {
    circuit: { type: String, required: true },
  },
  data() {
    return {
      circuits: Object.freeze(CIRCUITS),
      imageList: {
        tours,
        richelieu,
        esclavage,
        nazis,
      },
      levelIcons: {
        tours: level1,
        richelieu: level2,
        esclavage: level2,
        nazis: level3,
      },
      isFlipped: false,
    }
  },
  computed: {
    circuitData() {
      return this.circuits[this.circuit]
    },
    pricePositionClass() {
      switch (this.circuitData.position) {
        case 'tl':
          return 'top-6 left-6'
        case 'tr':
          return 'top-5 right-6'
        case 'bl':
          return 'bottom-[170px] left-7'
        default:
          return 'bottom-[170px] right-4'
      }
    },
  },
  methods: {
    goToStripe() {
      window.open(this.circuitData.stripeLink, '_blank')
    },
  },
})
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

.rotate-y-40 {
  transform: rotateY(40deg);
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
</style>
