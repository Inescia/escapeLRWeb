<template>
  <main :class="'project--' + project.color">
    <!-- PRESENTATION -->
    <section
      :class="`bg-black bg-[url('../assets/bg/dark1.jpg')] flex flex-col h-screen justify-between relative w-screen`"
    >
      <div class="absolute flex flex-col md:top-[20%] md:w-1/2 ml-4 top-[12%]">
        <h2
          class="rocknroll-one-regular-pinstripe mb-2 md:mb-6 md:text-5xl text-3xl text-center text-white"
        >
          {{ $t(`PORTFOLIO.PROJECTS.${projectName}.NAME`) }}
        </h2>
        <h5 class="font-light md:text-2xl text--colored text-center text-lg">
          {{ $t(`PORTFOLIO.PROJECTS.${projectName}.SUBTITLE`) }}
        </h5>
      </div>
      <div class="flex flex-col gap-2 md:pt-4 my-auto pt-[30%]">
        <AppImage
          v-for="techno in project.technoList"
          :key="techno"
          :source="`skills/${techno}.png`"
          :title="techno"
          :text="`Icon technologie ${techno}`"
          class="md:size-16 ml-2 object-contain size-7"
        />
      </div>
      <h5 class="left-4 mb-[5%] md:mb-14 md:text-3xl">
        {{ project.year }} - {{ $t(`PORTFOLIO.TYPES.${project.type}`) }}
      </h5>
      <div
        class="absolute md:right-[10%] md:size-[550px] md:top-[20%] right-20 rounded-full size-[200px] sphere top-1/3"
      />
      <AppImage
        v-show="project.supportList.includes('web') || project.supportList.includes('desktop')"
        ref="computer"
        :source="`parcours/${projectName}/computer.png`"
        text="Computer mockup"
        class="absolute delay-200 duration-2000 md:h-[60%] md:right-[20%] md:w-auto opacity-0 right-0 top-1/3 transition-opacity w-[97%]"
      />
      <AppImage
        v-show="project.supportList.includes('mobile') && project.supportList.length === 1"
        ref="iphone2"
        :source="`parcours/${projectName}/iphone2.png`"
        text="Mobile mockup"
        class="-rotate-90 absolute delay-200 duration-2000 md:h-[60%] md:right-[30%] md:w-auto opacity-0 right-[34%] top-[37%] transition-opacity w-[37%]"
      />
      <AppImage
        v-show="project.supportList.includes('web') || project.supportList.includes('mobile')"
        ref="iphone"
        :source="`parcours/${projectName}/iphone.png`"
        text="Mobile mockup"
        class="absolute delay-200 duration-1000 md:h-[60%] md:right-[13%] md:w-auto opacity-0 right-[8%] top-1/3 transition-opacity w-[37%]"
      />
      <AppImage
        source="icons/next.png"
        text="Next icon"
        class="absolute bottom-2 cursor-pointer md:bottom-6 md:right-8 right-4 size-14"
        @click="$router.push({ name: 'project', params: { id: nextProjectName } })"
      />
    </section>
    <!-- CONTEXT -->
    <section class="pt-4">
      <SectionTitle :label="$t('PORTFOLIO.TITLE_LIST[0]')" :color="project.color" />
    </section>
    <!-- FEATURES -->
    <section>
      <SectionTitle :label="$t('PORTFOLIO.TITLE_LIST[1]')" :color="project.color" />
      <div class="flex flex-wrap justify-center my-6">
        <div
          v-for="feature in project.featureList"
          :key="feature"
          class="flex flex-col items-center md:w-1/3"
        >
          <AppImage
            :source="`parcours/${projectName}/${feature}.png`"
            :text="`${feature} feature`"
            class="mt-4 size-20"
          />
        </div>
      </div>
    </section>
    <!-- STEPS -->
    <section class="flex flex-col items-center">
      <SectionTitle :label="$t('PORTFOLIO.TITLE_LIST[2]')" :color="project.color" />
      <template v-for="[name, value] in Object.entries(parcours)" :key="name">
        <TimeLine
          v-if="projectName === name"
          id="timeline"
          :color="value.color"
          :event-list="value.stepList"
          class="mb-8 md:-mb-[220px] mt-16 pointer-events-none"
        />
      </template>
    </section>
    <!-- DEMO/LINK -->
    <section class="flex flex-col items-center">
      <SectionTitle :label="$t('PORTFOLIO.TITLE_LIST[3]')" :color="project.color" />

      <VideoPlayer
        :is-iphone="['horseSafe', 'iSport'].includes(projectName)"
        :source="projectName"
      />
      <a v-if="project.link" :href="project.link" target="_blank" class="my-8">
        <AppButton :label="$t(`GLOBAL.SEE_${project.type.includes('App') ? 'APP' : 'WEBSITE'}`)" />
      </a>
    </section>
  </main>
</template>

<script>
import AppButton from '@/components/AppButton.vue'
import AppImage from '@/components/AppImage.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import TimeLine from '@/components/TimeLine.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import { CIRCUITS } from '@/data/circuits'

export default {
  name: 'CircuitPage',
  components: { AppButton, AppImage, SectionTitle, TimeLine, VideoPlayer },
  data() {
    return {
      parcours: Object.freeze(CIRCUITS),
    }
  },

  computed: {
    nextProjectName() {
      const projectList = Object.entries(this.parcours)
      const index = projectList.findIndex(([key]) => key === this.projectName) + 1
      return projectList[index >= projectList.length ? 0 : index][0]
    },
    projectName() {
      return this.$route.params.id
    },
    project() {
      return this.parcours[this.projectName]
    },
  },

  mounted() {
    setTimeout(() => {
      if (this.$refs['computer']) this.$refs['computer'].$el.classList.remove('opacity-0')
      if (this.$refs['iphone']) this.$refs['iphone'].$el.classList.remove('opacity-0')
      if (this.$refs['iphone2']) this.$refs['iphone2'].$el.classList.remove('opacity-0')
    })
  },
}
</script>

<style lang="scss" scoped>
@use '../theme/colors.scss' as colors;

@each $name, $color in colors {
  .project--#{$name} {
    & .sphere {
      background-color: $color;
      box-shadow:
        0 0 50px #fff,
        -10px 0 200px $color,
        10px 0 150px #fff;
    }

    & .text--colored {
      color: $color;
    }
  }
}
</style>
