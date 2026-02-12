<template>
  <div class="flex flex-col mt-4">
    <h4 class="text-blue">
      {{ label }}
    </h4>
    <p class="mb-4 mt-0 mx-6 text-center word-break">
      {{ text }}
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KeyNumber',
  props: {
    appendOperator: { type: String, default: null },
    prependOperator: { type: String, default: null },
    text: { type: String, required: true },
    value: { type: Number, required: true },
  },
  data() {
    return {
      progessValue: 0,
    }
  },
  computed: {
    label() {
      return (this.prependOperator || '') + this.progessValue + (this.appendOperator || '')
    },
  },
  methods: {
    /**
     * @method to animate the key number (from 0 to the value)
     */
    async animate() {
      const delay = (ms) => new Promise((res) => setTimeout(res, ms))
      const timer = 3000 / this.value

      for (let i = this.progessValue; i <= this.value; i++) {
        await delay(timer)
        this.progessValue = i
      }
    },
  },
})
</script>
