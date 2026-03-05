<template>
  <main>
    <div class="bg-darkBlue h-[6rem] hidden md:block shadow-2xl w-screen fixed" />
    <div class="md:pb-2 md:pt-6 pb-0 pt-20 mt-[6rem] px-16">
      <SectionTitle label="Mentions Légales" />
      <div v-for="i in 3" :key="i" class="mb-16">
        <h3 class="text-blue text-lg rocknroll-one-regular mt-6 text-left">
          {{ $t(`LEGAL[${i - 1}].TITLE`) }}
        </h3>
        <p class="text-left">{{ $t(`LEGAL[${i - 1}].CONTENT`) }}</p>
      </div>
      <SectionTitle label="Conditions Générales de Vente" />
      <div v-for="i in 5" :key="i" class="mb-16">
        <h3 class="text-blue text-lg rocknroll-one-regular mt-6 text-left">
          {{ $t(`CGV[${i - 1}].TITLE`) }}
        </h3>
        <p class="text-left">{{ $t(`CGV[${i - 1}].CONTENT`) }}</p>
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
