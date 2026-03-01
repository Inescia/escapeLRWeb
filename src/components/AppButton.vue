<template>
  <button
    :class="[
      'bg-darkBlue border-2 border-whiter group hover:border-beige m-2 px-6 pt-1.5 pb-2 rounded-full w-fit',
      isAnimated ? 'hover:animate-bounce' : '',
    ]"
  >
    <div
      v-if="isLoading"
      class="border-2 border-darkBlue border-r-beige border-t-beige h-6 loader rounded-full w-6"
    />
    <span
      v-else
      :class="[
        'rocknroll-one-regular font-light group-hover:text-beige  text-white tracking-widest uppercase',
        isAnimated ? 'text-xs' : 'text-base',
      ]"
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
    isAnimated: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
})
</script>
