<template>
  <div class="mx-auto w-fit">
    <h2>
      {{ label }}
    </h2>
    <div :class="`h-1 mx-auto rounded-full w-1/2 ${color ? 'line--' + color : 'bg-beige'}`" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionTitle',
  props: {
    color: { type: String, default: null },
    label: { type: String, required: true },
  },
})
</script>

<style lang="scss" scoped>
@use '../theme/colors.scss' as colors;

@each $name, $color in colors {
  .line--#{$name} {
    background-color: $color;
  }
}
</style>
