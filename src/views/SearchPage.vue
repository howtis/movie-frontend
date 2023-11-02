<template>
  <main>
    <SearchBox></SearchBox>

    <section class="content">
      <div v-if="results.length" class="exist">
        <h3>검색 결과:</h3>
      </div>
      <div v-if="fetchDone && results.length === 0" class="none">
        <h3>검색 결과가 없습니다.</h3>
      </div>
      <div class="results">
        <SearchResults :posters="results" />
        <infinite-loading ref="infiniteLoading" @infinite="loadResults">
          <template #spinner><span class="spinner"></span></template>
          <template #no-more><span class="no-more"></span></template>
          <template #no-results><span class="no-results"></span></template>
        </infinite-loading>
      </div>
    </section>
  </main>

  <Footer/>
</template>

<script>
import { defineComponent, toRaw } from 'vue'
import SearchBox from '@/components/search/SearchBox.vue'
import SearchResults from '@/components/search/SearchResults.vue'
import Footer from '@/components/MainFooter.vue'
import { InfiniteLoading } from 'infinite-loading-vue3-ts'
import axios from 'axios'

export default defineComponent({
  name: 'searchPage',
  components: { SearchResults, SearchBox, InfiniteLoading, Footer },
  watch: { $route: 'queryChange' },

  data () {
    return { results: [], page: 0, fetchDone: false }
  },

  methods: {
    async loadResults ($state) {
      const response = await axios.get(`/api/search?query=${this.$route.query.q}&page=${++this.page}`)
      const searchResults = response.data.results.filter((movie) => movie.poster_path !== null)

      this.results = toRaw(this.results).concat(searchResults)
      this.fetchDone = true

      response.data.total_pages > this.page
        ? $state.loaded()
        : $state.complete()
    },

    queryChange () {
      this.page = 0
      this.results = []
      this.fetchDone = false
      this.$refs.infiniteLoading.stateChanger.reset()
    }
  }
})
</script>
