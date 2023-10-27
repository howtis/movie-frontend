<template>
  <main>
    <SearchBox/>

    <section v-if="!isEmpty(detail)" class="content info d-sm-flex">
      <div class="poster-wrapper">
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
        <h4>평점
          <span v-if="this.reviewCount > 0">
            {{ this.reviewAverage.toFixed(2) }}점 ({{ this.reviewCount }}명)
          </span>
        </h4>
        <div class="d-flex align-items-center justify-content-between mb-2">
          <star-rating :size="'xl'" :rateText="true" :value="3"
            v-model="reviewRate" @update:score="reviewRate = $event"
          />
          <b-button variant="outline-secondary" @click="submitReview">등록</b-button>
        </div>
        <b-form-textarea v-model="reviewComment" rows="4" placeholder="리뷰를 입력해주세요" no-resize/>
      </div>

      <hr>
      <div class="mb-5">
        <ReviewResults :reviews="reviews"/>
      </div>
    </section>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchBox from '@/components/SearchBox.vue'
import VideoSwiper from '@/components/VideoSwiper.vue'
import PosterSwiper from '@/components/PosterSwiper.vue'
import StarRating from '@/components/StarRating.vue'
import ReviewResults from '@/components/ReviewResults.vue'
import axios from 'axios'
import { Movie } from '@/types/Movie'
import { Review } from '@/types/Review'
import { countBytes, isEmpty } from '@/util/util'

export default defineComponent({
  name: 'moviePage',
  components: { PosterSwiper, VideoSwiper, SearchBox, ReviewResults, StarRating },
  watch: { $route: 'fetchMovieData' },

  data () {
    return {
      detail: {},
      reviewAverage: 0,
      reviewComment: '',
      reviewCount: 0,
      reviewRate: 0,
      reviews: [],
      similar: [],
      videos: []
    }
  },

  mounted () {
    this.fetchMovieData()
  },

  methods: {
    isEmpty,

    getPosterPath (posterPath: Movie['poster_path']) {
      const imagePath = process.env.VUE_APP_TMDB_IMAGE_PATH
      return imagePath + '/w342' + posterPath
    },

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
      this.refreshReview(reviews)
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

    submitReview () {
      const movieId = this.$route.params.id.toString()

      const MAX_LENGTH = 255
      if (this.reviewComment.length === 0) return
      if (countBytes(this.reviewComment) > MAX_LENGTH) {
        this.reviewComment = this.reviewComment.slice(0, MAX_LENGTH)
      }
      const review: Review = {
        movie_id: movieId,
        comment: this.reviewComment,
        rating: this.reviewRate,
        created_at: new Date()
      }
      axios.post('/api/review/create', review)
        .then(async () => {
          this.refreshReview(await this.fetchReviews(movieId))
          this.reviewComment = ''
        }).catch(error => { console.error(error) })
    },

    refreshReview (reviews: never[]) {
      this.reviews = reviews
      const totalRating = reviews.reduce((sum: number, review: Review) => sum + review.rating, 0)
      this.reviewCount = reviews.length
      this.reviewAverage = totalRating / (this.reviewCount || 1)
    }
  }
})
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
