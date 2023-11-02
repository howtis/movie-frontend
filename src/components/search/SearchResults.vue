<template>
  <span v-for="(movie, index) in posters" :key="index">
    <img :src=getPosterPath(movie.poster_path) :alt="movie" @click="moviePage(movie.id)" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Movie } from '@/types/Movie'

export default defineComponent({
  props: {
    posters: { type: Array, required: true }
  },

  methods: {
    getPosterPath (posterPath: Movie['poster_path']) {
      const imagePath = process.env.VUE_APP_TMDB_IMAGE_PATH
      return imagePath + '/w342' + posterPath
    },

    moviePage (id: Movie['id']) {
      this.$router.push({
        name: 'movie', params: { id: id }
      })
    }
  }
})
</script>

<style scoped lang="scss">
img {
  cursor: pointer; border-radius: 2px; box-shadow: 2px 2px 2px #aaa; margin: 5px 5px 0 0;
  width: 13.4rem; height: 20.1rem;
  @media (max-width: 992px) { width: 7.5rem; height: 11.25rem; }
  @media (max-width: 576px) { width: 5rem;   height: 7.5rem;   }
}
</style>
