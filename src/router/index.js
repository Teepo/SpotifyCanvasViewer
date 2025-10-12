// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [{
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      }, {
        path: '/current',
        name: 'current',
        component: () => import(/* webpackChunkName: "current" */ '@/views/Current.vue'),
      }, {
        path: '/playlist',
        name: 'playlist',
        component: () => import(/* webpackChunkName: "playlist" */ '@/views/Playlist.vue'),
      }, {
        path: '/theater',
        name: 'theater',
        component: () => import(/* webpackChunkName: "theater" */ '@/views/Theater.vue'),
      }, {
        path: '/shuffle',
        name: 'shuffle',
        component: () => import(/* webpackChunkName: "shuffle" */ '@/views/Shuffle.vue'),
      }, {
        path: '/spotify_login_callback',
        name: 'spotify_login_callback',
        component: () => import(/* webpackChunkName: "spotify_login_callback" */ '@/views/SpotifyCallback.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
