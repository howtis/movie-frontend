<template>
  <span v-for="(review, index) in reviews" :key="index">
    <div class="d-flex justify-content-between mt-5">
      <star-rating :size="'lg'" :rateText="false" :disabled="true" :value="review.rating"/>
      <span>📅 {{ new Date(review.created_at).toLocaleDateString() }}</span>
    </div>
    <div class="review mt-2">
      <pre>{{ review.comment }}</pre>
    </div>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StarRating from '@/components/StarRating.vue'

export default defineComponent({
  components: { StarRating },
  props: {
    reviews: { type: Array, required: true }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
pre { font-family: $globalFont; white-space: pre }
</style>
