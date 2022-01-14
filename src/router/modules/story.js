const storyRouter = [
  {
    path: 'story/chat',
    component: () => import('@/views/main/story/chat/chat.vue')
  },
  {
    path: 'story/list',
    component: () => import('@/views/main/story/list/list.vue')
  }
]

export default storyRouter
