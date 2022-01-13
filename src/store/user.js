import { defineStore } from 'pinia'
import { login } from '@/service/api/login.js'
import localCache from '@/utils/cache.js'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: ''
    }
  },

  actions: {
    async loginAction(account) {
      const { data } = await login(account)
      localCache.setCache('token', data.token)
      router.push('/main')
    }
  }
})
