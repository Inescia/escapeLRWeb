<template>
  <div class="h-full bg-black w-full">
    <img
      :src="imageList[circuit]"
      :alt="`Circuit ${circuit}`"
      class="object-cover absolute h-full w-full left-0 bg-black opacity-50"
    />
    <div class="flex flex-col h-full md:p-8 p-1 absolute left-0">
      <h2 class="md:ml-8 text-white">{{ $t(`CIRCUITS.${circuit.toUpperCase()}.NAME`) }}</h2>
      <div class="w-2/5 h-1 ml-32 mb-6 bg-beige rounded-full" />
      <div class="flex justify-center md:gap-10 gap-4">
        <div class="flex flex-col justify-between items-center gap-2">
          <img src="../assets/icons/duration.png" alt="Duration icon" class="md:w-16 w-10" />
          <span class="text-lightBlue text-lg quicksand-bold">{{ circuitData.duration }}</span>
        </div>
        <div class="flex flex-col justify-between items-center gap-2">
          <img src="../assets/icons/distance.png" alt="Distance icon" class="md:w-16 w-10" />
          <span class="text-lightBlue text-lg quicksand-bold">{{ circuitData.distance }}</span>
        </div>
        <div class="flex flex-col justify-between items-center gap-2">
          <img src="../assets/icons/level.png" alt="Level icon" class="md:w-16 w-10" />
          <span class="text-lightBlue text-lg quicksand-bold">{{ circuitData.level }}</span>
        </div>
      </div>
      <p
        class="text-white self-center bg-black bg-opacity-60 rounded-lg md:px-4 px-0 py-2 text-center"
      >
        {{ $t(`CIRCUITS.${circuit.toUpperCase()}.DESCRIPTION`) }}
      </p>
      <div class="flex items-center absolute md:top-10 md:right-6 top-16 right-0">
        <span
          class="text-black md:text-lg text-sm rocknroll-one-regular bg-[url('../assets/icons/tag.png')] bg-no-repeat bg-contain md:pb-8 md:pr-14 md:pl-7 md:pt-7 py-5 pr-6 pl-4"
          >{{ circuitData.price }}
        </span>
      </div>
      <AppButton
        :label="$t('GLOBAL.BUY_CODE')"
        class="absolute md:bottom-6 bottom-4 md:right-6 right-2"
        @click="goToStripe"
      />
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
  name: 'CircuitCard',
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
