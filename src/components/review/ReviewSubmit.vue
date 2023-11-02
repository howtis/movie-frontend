<template>
  <h4>평점
    <span v-if="this.reviewRating && this.reviewCount > 0">
      {{ this.reviewRating.toFixed(2) }}점 ({{ this.reviewCount }}명)
    </span>
  </h4>
  <div class="d-flex align-items-center justify-content-between mb-2">
    <star-rating :size="'xl'" :rateText="true" v-model="reviewRate" :value="reviewRate"
                 @update:score="reviewRate = $event"
    />
    <b-button variant="outline-secondary" @click="submitReview">등록</b-button>
  </div>
  <b-form-textarea v-model="reviewComment" rows="4" placeholder="리뷰를 입력해주세요" no-resize/>
  <div class="d-md-flex justify-content-between">
    <p :style="commentLength">{{ reviewComment.trim().length }} / {{ this.COMMENT_MAX_LENGTH }}</p>
    <p class="recaptcha">This site is protected by reCAPTCHA and the Google
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Review } from '@/types/Review'
import { useReCaptcha } from 'vue-recaptcha-v3'
import StarRating from '@/components/widgets/StarRating.vue'
import axios from 'axios'

export default defineComponent({
  components: { StarRating },
  props: {
    reviewRating: { type: Number, required: true },
    reviewCount: { type: Number, required: true }
  },

  data () {
    return {
      reviewComment: '',
      reviewRate: 3,
      COMMENT_MAX_LENGTH: 255
    }
  },

  setup () {
    const reCaptcha = useReCaptcha()
    const recaptcha = async (): Promise<string | undefined> => {
      await reCaptcha?.recaptchaLoaded()
      return reCaptcha?.executeRecaptcha('submitReview')
    }

    return { recaptcha }
  },

  methods: {
    async submitReview () {
      const movieId = this.$route.params.id.toString()
      let comment = this.reviewComment.trim()

      if (comment.length === 0) return
      if (comment.length > this.COMMENT_MAX_LENGTH) {
        comment = comment.slice(0, this.COMMENT_MAX_LENGTH)
      }

      const review: Review = {
        movie_id: movieId,
        comment: comment,
        rating: this.reviewRate,
        created_at: new Date(),
        token: await this.recaptcha()
      }

      axios.post('/api/review/create', review)
        .then(() => this.$emit('update:review'))

      this.reviewComment = ''
      this.reviewRate = 3
    }
  },

  computed: {
    commentLength () {
      return {
        color: this.reviewComment.length > 255
          ? 'red'
          : 'inherit'
      }
    }
  }
})
</script>

<style scoped lang="scss">
.recaptcha {
  font-size: 0.75rem;
  font-weight: 400;
}
</style>
