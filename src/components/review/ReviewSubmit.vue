<template>
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
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { countBytes } from '@/util/util'
import { Review } from '@/types/Review'
import StarRating from '@/components/widgets/StarRating.vue'
import axios from 'axios'

export default defineComponent({
  components: { StarRating },
  watch: { reviews: 'refreshReview' },
  props: {
    reviews: { type: Array, required: true }
  },

  data () {
    return {
      reviewAverage: 0,
      reviewComment: '',
      reviewCount: 0,
      reviewRate: 0
    }
  },

  methods: {
    submitReview () {
      const movieId = this.$route.params.id.toString()

      const MAX_LENGTH = 255
      if (this.reviewComment.trim().length === 0) return
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
        .then(() => {
          this.refreshReview()
          this.$emit('update:review')
        }).catch(error => {
          console.error(error)
        })
    },

    refreshReview () {
      const reviews = toRaw(this.reviews)
      const totalRating = reviews.reduce((sum: number, review) => sum + (review as Review).rating, 0)
      this.reviewCount = reviews.length
      this.reviewAverage = totalRating / (this.reviewCount || 1)
      this.reviewComment = ''
    }
  }
})
</script>
