<template>
  <div class="flex items-center justify-center mx-2 my-16">
    <video
      :src="formatVideoUrl"
      :class="[isIphone ? 'h-[500px] rounded-[30px]' : ' rounded-xl', 'md:h-[500px]']"
      controls
      loop
      muted
    >
      {{ $t('GLOBAL.ERROR.VIDEO') }}
    </video>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    isIphone: { type: Boolean, default: false },
    source: {
      type: String,
      required: true,
    },
  },
  computed: {
    formatVideoUrl() {
      return new URL(`../assets/videos/${this.source}.mp4`, import.meta.url).href;
    },
  },
};
</script>
