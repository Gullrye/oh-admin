/**
 * localStorage 二次封装
 * 如果有多个系统都用到了 localStorage 中的 name，那么就会相互覆盖。可以用命名空间来隔开，即本系统的信息都存到一个大对象中。
 */

// 所有要缓存的数据都存储在一个名为 oh-admin 的对象中，即 window.localStorage: { "oh-admin": "{key: val, ...}" }
const ohAdminData = 'oh-admin'

const localCache = {
  // 获取大对象
  getStorage() {
    return JSON.parse(window.localStorage.getItem(ohAdminData) || '{}')
  },
  setCache(key, val) {
    let storage = this.getStorage()
    // 大对象内添加键值对
    storage[key] = val
    // 更新大对象
    window.localStorage.setItem(ohAdminData, JSON.stringify(storage))
  },
  // 获取大对象内的 key
  getCache(key) {
    return this.getStorage()[key]
  },
  deleteCache(key) {
    let storage = this.getStorage()
    // 删除键值对
    delete storage[key]
    // 更新大对象
    window.localStorage.setItem(ohAdminData, JSON.stringify(storage))
  },
  clearCache() {
    window.localStorage.clear()
  }
}

export default localCache
