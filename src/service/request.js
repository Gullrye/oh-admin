/**
 * axios 库二次封装
 * 创建请求类
 */
import axios from 'axios'

const DEFAULT_LOADING = true

class GullRequest {
  constructor(config) {
    // 使用自定义配置 config 新建一个实例
    this.instance = axios.create(config)
    this.showLoading = config.showLoading || DEFAULT_LOADING

    /**
     * 当前实例的自有的拦截器，通过实例传入
     */
    this.interceptors = config.interceptors
    // 实例的请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestHook,
      this.interceptors?.requestHookCatch
    )
    // 实例的响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseHook,
      this.interceptors?.responseHookCatch
    )

    /**
     * 所有实例共有的拦截器
     */
    this.instance.interceptors.request.use(
      config => {
        // 是否显示加载动画
        if (this.showLoading) {
          // eslint-disable-next-line no-undef
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      err => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      res => {
        this.loading?.close()
        const data = res.data
        if (res.code === 400) {
          // eslint-disable-next-line no-undef
          ElMessage({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
        if (data?.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      err => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404 not found')
        }
        return err
      }
    )
  }

  /**
   * 原有的 axios api 在 this.instance 内，我们需要实现属于 GullRequest 类的实例的 api
   * axios.request(config) 相当于 axios(config)
   * 在下方的 request 方法中使用了 this.instance.request() 发起了请求
   */
  request(config) {
    return new Promise((resolve, reject) => {
      // 在发送请求之前做些处理，然后返回处理后的 config
      if (config.interceptors?.requestHook) {
        config = config.interceptors.requestHook(config)
      }
      // 设置是否加载动画，即所有实例共有的拦截器处是否加载动画
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      // 实例发起请求返回数据
      this.instance
        .request(config)
        .then(res => {
          // 对响应数据做点什么
          if (config.interceptors?.responseHook) {
            res.config.interceptors.responseHook(res)
          }
          // 加载动画设置回默认值
          this.showLoading = DEFAULT_LOADING
          // 返回数据
          resolve(res)
        })
        .catch(err => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  /**
   * 基于上方的 request 实现其他请求 api
   */
  get(config) {
    return this.request({ method: 'GET', ...config })
  }
  post(config) {
    return this.request({ method: 'POST', ...config })
  }
  delete(config) {
    return this.request({ method: 'DELETE', ...config })
  }
  patch(config) {
    return this.request({ method: 'PACTH', ...config })
  }
}

export default GullRequest
