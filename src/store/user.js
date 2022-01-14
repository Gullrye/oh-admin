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
      // token: '',
      // userInfo: {},
      // userMenus: []
      token: localCache.getCache('token') || '',
      userInfo: localCache.getCache('userInfo') || {},
      userMenus: localCache.getCache('userMenus') || []
    }
  },

  actions: {
    async loginAction(account) {
      // 登录
      const loginResult = await login(account)
      const { id, token } = loginResult.data
      this.token = token
      localCache.setCache('token', token)

      // 用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)

      // 用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)

      // 获取数据后，跳到主页
      router.push('/main')
    }
  }
})
