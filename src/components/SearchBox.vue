<template>
  <section class="content search">
    <div class="title">
      <h3>영화를 검색해보세요!
        <span class="home" @click="this.$router.push('/')">🎬</span>
      </h3>
    </div>
    <div class="search">
      <b-input-group>
        <b-form-input v-model="query" @keyup.enter="search"></b-form-input>
        <b-input-group-append>
          <b-button @click="search"><i class="fa-solid fa-magnifying-glass"></i></b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return { query: '' }
  },
  methods: {
    search () {
      this.$router.push({ name: 'search', query: { q: this.query } })
    }
  }
})
</script>

<style scoped lang="scss">
  .home { cursor: pointer }
</style>
