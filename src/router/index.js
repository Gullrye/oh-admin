import { createRouter, createWebHashHistory } from 'vue-router'
import localCache from '@/utils/cache.js'
import systemRouter from './modules/system'
import productRouter from './modules/product'
import analysisRouter from './modules/analysis'
import storyRouter from './modules/story'

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/system/user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/main/main.vue'),
    children: [].concat(
      systemRouter,
      productRouter,
      analysisRouter,
      storyRouter
    )
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(to => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return { path: '/login' }
    }
  }
})
export default router
