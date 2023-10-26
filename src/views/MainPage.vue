<template>
  <main>
    <SearchBox/>

    <section class="content nowplaying">
      <div class="title">
        <h4>상영중인 영화</h4>
      </div>
      <div>
        <PosterSwiper :posters="movies.nowplaying" />
      </div>
    </section>

    <section class="content upcoming">
      <div class="title">
        <h4>방영 예정 영화</h4>
      </div>
      <div>
        <PosterSwiper :posters="movies.upcoming" />
      </div>
    </section>

    <section class="content genre">
      <div class="title">
        <h4>이런 영화는 어떠신가요?</h4>
      </div>
      <div>
        <PosterSwiper :posters="movies.genre" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PosterSwiper from '@/components/PosterSwiper.vue'
import SearchBox from '@/components/SearchBox.vue'
import axios from 'axios'
import { Movie } from '@/types/Movie'

export default defineComponent({
  name: 'mainPage',
  components: { PosterSwiper, SearchBox },

  data () {
    return {
      movies: { nowplaying: [], upcoming: [], genre: [] }
    }
  },

  mounted () {
    for (const api of Object.keys(this.movies)) {
      this.fetchMovies(api)
    }
  },

  methods: {
    async fetchMovies (api: string) {
      const response = await axios.get('/api/' + api)
      this.movies[api as keyof typeof this.movies] =
        response.data.results.filter((movie: Movie) => movie.poster_path !== null)
    }
  }
})
</script>
