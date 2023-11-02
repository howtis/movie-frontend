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
        <ReviewSubmit :reviewRating="reviewRating" :reviewCount="reviewCount"
                      @update:review="() => refreshReview(1, true /* first page, submit */)" />
      </div>

      <hr>
      <div class="mb-5">
        <ReviewResults :reviews="reviews" />
        <Pagination v-if="this.reviewCount > reviewPaging"
                    :total-rows="this.reviewCount" :page="reviewPage" :paging="reviewPaging"
                    @update:page="(page) => refreshReview(page)" />
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
import Pagination from '@/components/widgets/PaginationComponent.vue'
import Footer from '@/components/MainFooter.vue'
import axios from 'axios'
import { Movie } from '@/types/Movie'
import { isEmpty } from '@/util/util'

export default defineComponent({
  name: 'moviePage',
  components: { SearchBox, MovieDetail, PosterSwiper, VideoSwiper, ReviewSubmit, ReviewResults, Pagination, Footer },
  watch: {
    $route: 'fetchMovieData'
  },

  data () {
    return {
      detail: {},
      reviews: [],
      similar: [],
      videos: [],
      reviewRating: 0,
      reviewCount: 0,
      reviewPage: 1,
      reviewPaging: 5
    }
  },

  mounted () {
    this.fetchMovieData()
  },

  methods: {
    isEmpty,

    async fetchMovieData () {
      const movieId = this.$route.params.id.toString()
      const [detail, videos, similar, reviews, rating] = await Promise.all([
        this.fetchMovieDetail(movieId),
        this.fetchMovieVideos(movieId),
        this.fetchMovieSimilar(movieId),
        this.fetchReviews(movieId, 1 /* first page */),
        this.fetchReviewRating(movieId)
      ])

      this.detail = detail
      this.videos = videos
      this.similar = similar
      this.reviews = reviews.content
      this.reviewCount = reviews.totalElements
      this.reviewRating = rating
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

    async fetchReviews (id: string, page: number) {
      const response = await axios.get('/api/review/list/' + id, {
        params: { page: page - 1, size: this.reviewPaging }
      })
      return response.data
    },

    async fetchReviewRating (id: string) {
      const response = await axios.get('/api/review/rating/' + id)
      return response.data
    },

    async refreshReview (page: number, submit?: boolean) {
      const id = this.$route.params.id.toString()
      const reviews = await this.fetchReviews(id, page)

      this.reviews = reviews.content
      this.reviewCount = reviews.totalElements
      this.reviewPage = page

      if (submit) await this.refreshReviewRating(id)
    },

    async refreshReviewRating (id: string) {
      this.reviewRating = await this.fetchReviewRating(id)
    }
  }
})
</script>
