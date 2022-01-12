# vue3-js-admin

一个 Vue3 + Element Plus 后台管理系统。

## 项目初始化及代码规范配置

初始化：`Vue3 + Vuex + Router + Less + Prettier + Eslint`；

代码格式、提交规范：EditorConfig 为不同编辑器维护一致的代码风格，`Prettier + Eslint + husky + commitizen` 保证代码符合 eslint 规范 和 git commit 规范。

## 组件库安装和工具封装

### CSS reset

安装 `normalize.css`：`yarn add normalize.css`；

在 `src/main.js` 中引入：`import 'normalize.css'`。

### Element Plus 按需导入

安装 `element-plus`：`yarn add element-plus`；

按需导入所用到的额外的插件：`yarn add -D unplugin-vue-components unplugin-auto-import`；

之后在 `vue.config.js` 中写入：

```js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}
```

在 `src/App.vue` 的 `template` 中使用 `<el-button type="primary">element plus is ok!</el-button>` 查看使用情况，可以发现页面按钮正常显示，安装完成。

### axios 库二次封装、区分不同环境及跨域设置

1.区分不同环境：

> [vue cli 模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)：只有 `NODE_ENV`，`BASE_URL` 和以 `VUE_APP_` 开头的变量将通过 `webpack.DefinePlugin` 静态地嵌入到客户端侧的代码中。

`.env.development` 文件设置如下，让开发环境下能够请求对应的接口。

```js
# dev
VUE_APP_BASE_URL = 'http://152.136.185.210:5000'
VUE_APP_BASE_API = '/api'
```

2.跨域设置

`vue.config.js` 设置接口代理，如下：

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

3.axios 库二次封装

见 `src/service`。

`src/service/request` 中创建请求类，`src/service/index` 中传入 config 创建请求实例。

```js
// axios(config) 相当于 axios.request(config)
axios({
  url: '/api/login',
  method: 'POST',
  data: {
    name: 'gull',
    password: '123456'
  }
})
axios.request({
  url: '/api/login',
  method: 'POST',
  data: {
    name: 'gull',
    password: '123456'
  }
})

```

### localStorage 二次封装

见 `src/utils/cache.js`。

将项目中所有数据存入一个大对象中。
