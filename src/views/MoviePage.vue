<template>
  <main>
    <SearchBox/>

    <section v-if="!isEmpty(detail)" class="content info">
      <MovieDetail :detail="detail" />
    </section>

    <section v-if="!isEmpty(videos)" class="content video">
      <div class="youtube">
        <h4>관련 영상</h4>
        <VideoSwiper :videos="videos" />
      </div>
    </section>

    <section v-if="!isEmpty(similar)" class="content related">
      <div>
        <h4>비슷한 영화</h4>
        <PosterSwiper :posters="similar" />
      </div>
    </section>

    <section class="content reviews">
      <div>
        <ReviewSubmit :reviews="reviews" @update:review="refreshReview" />
      </div>

      <hr>
      <div class="mb-5">
        <ReviewResults :reviews="reviews" />
      </div>
    </section>
  </main>

  <Footer/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchBox from '@/components/search/SearchBox.vue'
import MovieDetail from '@/components/movie/MovieDetail.vue'
import VideoSwiper from '@/components/widgets/VideoSwiper.vue'
import PosterSwiper from '@/components/widgets/PosterSwiper.vue'
import ReviewSubmit from '@/components/review/ReviewSubmit.vue'
import ReviewResults from '@/components/review/ReviewResults.vue'
import Footer from '@/components/MainFooter.vue'
import axios from 'axios'
import { Movie } from '@/types/Movie'
import { isEmpty } from '@/util/util'

export default defineComponent({
  name: 'moviePage',
  components: { SearchBox, MovieDetail, PosterSwiper, VideoSwiper, ReviewSubmit, ReviewResults, Footer },
  watch: { $route: 'fetchMovieData' },

  data () {
    return { detail: {}, reviews: [], similar: [], videos: [] }
  },

  mounted () {
    this.fetchMovieData()
  },

  methods: {
    isEmpty,

    async fetchMovieData () {
      const movieId = this.$route.params.id.toString()
      const [detail, videos, similar, reviews] = await Promise.all([
        this.fetchMovieDetail(movieId),
        this.fetchMovieVideos(movieId),
        this.fetchMovieSimilar(movieId),
        this.fetchReviews(movieId)
      ])

      this.detail = detail
      this.videos = videos
      this.similar = similar
      this.reviews = reviews
    },

    async fetchMovieDetail (id: string) {
      const response = await axios.get('/api/detail/' + id)
      return response.data
    },

    async fetchMovieSimilar (id: string) {
      const response = await axios.get('/api/similar/' + id)
      return response.data.results.filter((movie: Movie) => movie.poster_path !== null)
    },

    async fetchMovieVideos (id: string) {
      const response = await axios.get('/api/videos/' + id)
      return response.data.results
    },

    async fetchReviews (id: string): Promise<never[]> {
      const response = await axios.get('/api/review/list/' + id)
      return response.data
    },

    async refreshReview () {
      const movieId = this.$route.params.id.toString()
      this.reviews = await this.fetchReviews(movieId)
    }
  }
})
</script>
