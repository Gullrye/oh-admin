import { defineStore } from 'pinia'
import {
  login,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/api/login.js'
import localCache from '@/utils/cache.js'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: localCache.getCache('token') || '',
      id: localCache.getCache('id') || '',
      userInfo: localCache.getCache('userInfo') || {},
      menuList: localCache.getCache('menuList') || []
    }
  },

  actions: {
    async loginAction(account) {
      const { data } = await login(account)
      localCache.setCache('token', data.token)
      localCache.setCache('id', data.id)
      this.token = data.token
      this.id = data.id
      router.push('/main')
    },

    async getUserInfoAction() {
      const { data } = await requestUserInfoById(this.id)
      this.userInfo = data
      localCache.setCache('userInfo', data)
    },

    async getMenuListAction() {
      const { data } = await requestUserMenusByRoleId(this.userInfo.role.id)
      this.menuList = data
      localCache.setCache('menuList', data)
    }
  }
})
