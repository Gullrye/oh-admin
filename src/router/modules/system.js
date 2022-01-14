const systemRouter = [
  {
    path: 'system/user',
    component: () => import('@/views/main/system/user/user.vue')
  },
  {
    path: 'system/department',
    component: () => import('@/views/main/system/department/department.vue')
  },
  {
    path: 'system/role',
    component: () => import('@/views/main/system/role/role.vue')
  },
  {
    path: 'system/menu',
    component: () => import('@/views/main/system/menu/menu.vue')
  }
]

export default systemRouter
