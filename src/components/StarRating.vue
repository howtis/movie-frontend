<template>
  <div class="star-rating">
    <span v-for="index in 5" :key="index" @click="refresh(index)" :style="rating">
      <span v-if="index <= score"><i :class="'fa-solid fa-star fa-' + size" style="color: #ff9922"></i></span>
      <span v-if="index > score"><i :class="'fa-solid fa-star fa-' + size"></i></span>
    </span>
    <span v-if="rateText" class="value m-1">{{ score }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return { score: 0 }
  },

  mounted () {
    if (this.value) this.refresh(this.value)
  },

  props: {
    size: String,
    rateText: Boolean,
    disabled: Boolean,
    value: Number
  },

  methods: {
    refresh (score: number) {
      this.score = score
      this.$emit('update:score', score)
    }
  },

  computed: {
    rating () {
      return {
        'pointer-events': this.disabled
          ? 'none'
          : 'auto',
        cursor: this.disabled
          ? 'inherit'
          : 'pointer'
      }
    }
  }
})
</script>
