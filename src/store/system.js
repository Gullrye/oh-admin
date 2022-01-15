import { defineStore } from 'pinia'
import { getPageListData } from '@/service/api/system.js'
// import localCache from '@/utils/cache.js'
// import router from '@/router'
import { formatUtcString } from '@/utils/date-format'
import localCache from '../utils/cache'

export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      userList: [],
      userCount: 0,
      departmentList: localCache.getCache('departmentList') || [],
      departmentCount: 0,
      roleList: localCache.getCache('roleList') || [],
      roleCount: []
    }
  },

  actions: {
    async getUserListAction(listData) {
      const { data } = await getPageListData('/users/list', listData)
      data.list.forEach(item => {
        item.createAt = formatUtcString(item.createAt)
        item.updateAt = formatUtcString(item.updateAt)
      })
      this.userList = data.list
      this.userCount = data.totalCount
    },
    async getDepartmentListAction() {
      const { data } = await getPageListData('/department/list', {
        offset: 0,
        size: 10
      })
      this.departmentList = data.list
      this.departmentCount = data.totalCount
      localCache.setCache('departmentList', data.list)
    },
    async getRoleListAction() {
      const { data } = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      this.roleList = data.list
      this.roleCount = data.totalCount
      localCache.setCache('roleList', data.list)
    }
  }
})
