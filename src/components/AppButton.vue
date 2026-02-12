<template>
  <button
    class="bg-darkBlue border-2 border-whiter group hover:border-beige hover:animate-bounce m-2 px-6 py-1 rounded-full w-fit"
  >
    <div
      v-if="isLoading"
      class="border-2 border-darkBlue border-r-beige border-t-beige h-6 loader rounded-full w-6"
    />
    <span
      v-else
      class="rocknroll-one-regular font-light group-hover:text-beige text-xs text-white tracking-widest uppercase"
    >
      {{ label }}
    </span>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
})
</script>
