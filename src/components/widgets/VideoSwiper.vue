<template>
  <swiper-container
    space-between="5"
    slides-per-view="auto"
    navigation="true"
  >
    <swiper-slide class="w-auto" v-for="(video, index) in videos" :key="index">
      <div class="iframe-wrapper">
        <iframe :src=getVideoUrl(video.key)></iframe>
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Video } from '@/types/Video'

export default defineComponent({
  props: {
    videos: { type: Array, required: true }
  },

  methods: {
    getVideoUrl (videoPath: Video['key']) {
      return `https://www.youtube.com/embed/${videoPath}`
    }
  }
})
</script>

<style scoped lang="scss">
.iframe-wrapper > iframe {
  width: 325px; height: 182px;
  @media (max-width: 576px) { width: 240px; height: 135px }
}
</style>
