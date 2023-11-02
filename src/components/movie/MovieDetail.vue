<template>
  <div class="d-sm-flex">
    <div class="poster-wrapper m-2">
      <img class="m-sm-auto d-sm-block" :src="getPosterPath(detail.poster_path)" :alt="detail.title">
    </div>
    <div class="info-wrapper">
      <h1 class="title">{{ detail.title }} ({{ new Date(detail.release_date).getFullYear() }})</h1>
      <span class="genres">🎬{{ detail.genres.map(genre => genre.name).join(', ') }}</span>
      <span class="runtime m-3">⏰{{ detail.runtime }}분</span>
      <span class="date">📅️{{ detail.release_date }}</span>
      <h3 class="tagline mt-5">{{ detail.tagline }}</h3>
      <h5 class="overview">{{ detail.overview }}</h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Movie } from '@/types/Movie'

defineProps({
  detail: { Type: Array, required: true }
})

function getPosterPath (posterPath: Movie['poster_path']) {
  const imagePath = process.env.VUE_APP_TMDB_IMAGE_PATH
  return imagePath + '/w342' + posterPath
}
</script>

<style scoped lang="scss">
.poster-wrapper img {
  border-radius: 4px;
  box-shadow: 4px 4px 4px #aaa;

  width: 18rem; height: 27rem;
  @media (max-width: 576px) {
    width: 15rem; height: 22.5rem;
  }
}
.info-wrapper {
  .tagline, .overview { font-weight: lighter }
}
</style>
