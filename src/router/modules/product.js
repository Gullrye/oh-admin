const productRouter = [
  {
    path: 'product/category',
    component: () => import('@/views/main/product/category/category.vue')
  },
  {
    path: 'product/goods',
    component: () => import('@/views/main/product/goods/goods.vue')
  }
]

export default productRouter
