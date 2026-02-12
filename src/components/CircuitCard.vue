<template>
  <div class="flex">
    <div class="flex flex-col">
      <h4></h4>
      <div class="flex">
        <div
          v-for="(item, index) in ['duration', 'distance', 'level']"
          :key="index"
          class="flex flex-col"
        >
          <AppImage />
          <p>{{ circuits[circuit][item] }}</p>
        </div>
      </div>
      <p></p>
    </div>
    <div class="flex flex-col">
      <div class="flex">
        <p>{{ circuits[circuit].price }}€/pers</p>
        <AppImage />
      </div>
      <AppButton :label="$t('GLOBAL.BUY_CODE')" class="mt-4" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppImage from '@/components/AppImage.vue'
import { CIRCUITS } from '@/data/circuits.js'

export default defineComponent({
  name: 'CircuitCard',
  components: { AppButton, AppImage },
  props: {
    circuit: { type: String, required: true },
  },
  data() {
    return {
      circuits: Object.freeze(CIRCUITS),
    }
  },
})
</script>
