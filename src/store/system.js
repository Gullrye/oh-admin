import { defineStore } from 'pinia'
import { getPageListData } from '@/service/api/system.js'
// import localCache from '@/utils/cache.js'
// import router from '@/router'
import { formatUtcString } from '@/utils/date-format'

export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      userList: [],
      userCount: 0
    }
  },

  actions: {
    async getUserListAction() {
      const { data } = await getPageListData('/users/list', {
        offset: 0,
        size: 5
      })
      data.list.forEach(item => {
        item.createAt = formatUtcString(item.createAt)
        item.updateAt = formatUtcString(item.updateAt)
      })
      this.userList = data.list
      this.userCount = data.totalCount
    }
  }
})
