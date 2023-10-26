import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import axios from 'axios'
import MainPage from '@/views/MainPage.vue'
import MoviePage from '@/views/MoviePage.vue'
import SearchPage from '@/views/SearchPage.vue'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? '/'
    : 'http://backend'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: MoviePage
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
