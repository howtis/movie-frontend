<template>
  <b-pagination :total-rows="totalRows" v-model="currentPage" @click="pageChange"
                :per-page="paging" :limit="5" size="sm" align="center" pills />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['update:page'])
const props = defineProps({
  totalRows: { type: Number, required: true },
  page: { type: Number, required: true },
  paging: { type: Number, required: true }
})

let currentPage = ref(props.page)
watch(() => props.page,
  (page) => { currentPage = ref(page) })

function pageChange () {
  emit('update:page', currentPage.value)
}
</script>

<style lang="scss">

</style>
