/**
 * 创建请求实例
 */
import GullRequest from './request'
import localCache from '../utils/cache'

// 传入 config
const gullRequest = new GullRequest({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  interceptors: {
    requestHook: config => {
      // 携带 token 的拦截
      const token = localCache.getCache('token')
      if (token) {
        // 给请求头设置 token
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestHookCatch: err => {
      console.log('sss')
      // eslint-disable-next-line no-undef
      ElMessage.error('请求错误')
      return err
    },
    responseHook: res => {
      return res
    },
    responseHookCatch: err => {
      return err
    }
  }
})

export default gullRequest
