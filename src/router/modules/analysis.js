const analysisRouter = [
  {
    path: 'analysis/overview',
    component: () => import('@/views/main/analysis/overview/overview.vue')
  },
  {
    path: 'analysis/dashboard',
    component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
  }
]

export default analysisRouter
