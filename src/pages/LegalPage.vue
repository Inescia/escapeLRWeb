<template>
  <main>
    <div class="bg-darkBlue h-[6rem] hidden md:block shadow-2xl w-screen fixed" />
    <div class="md:pb-2 md:pt-6 pb-0 pt-20 mt-[6rem]">
      <div v-for="i in 3" :key="i">
        <SectionTitle :label="$t(`LEGAL[${i - 1}].TITLE`)" />
        <p>{{ $t(`LEGAL[${i - 1}].CONTENT`, { mail }) }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'

export default {
  name: 'LegalPage',
  components: { SectionTitle },

  data() {
    return {
      mail: 'ingenious.code.tech@gmail.com',
    }
  },
}
</script>
