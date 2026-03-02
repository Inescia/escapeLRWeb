<template>
  <div class="perspective w-[350px] h-[510px]">
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

        <p class="text-darkBlue rocknroll-one-regular text-base text-widest text-center m-2 mt-0">
          {{ circuitData.price }} / joueur
        </p>
        <img
          src="../assets/icons/price/7.png"
          alt="illustration"
          class="absolute w-[70px] bottom-[140px] right-1 object-cover"
        />
        <div class="flex-1 flex flex-col justify-between">
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
              <img src="../assets/icons/level.png" alt="Level icon" class="md:w-10 w-8" />
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
        class="absolute w-full h-full rounded-2xl shadow-lg backface-hidden rotate-y-180 flex flex-col justify-between items-center"
      >
        <div class="w-full h-fit">
          <h2 class="text-darkBlue text-lg rocknroll-one-regular mt-12 mb-0 text-center">
            {{ $t(`CIRCUITS.${circuit.toUpperCase()}.NAME`) }}
          </h2>
          <p class="text-darkBlue text-xs p-4 m-0">
            {{ $t(`CIRCUITS.${circuit.toUpperCase()}.DESCRIPTION`) }}
          </p>
        </div>
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
      isFlipped: false,
    }
  },
  computed: {
    circuitData() {
      return this.circuits[this.circuit]
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
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
</style>
