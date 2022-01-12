# vue3-js-admin

一个 Vue3 + Element Plus 后台管理系统。

## 项目初始化及代码规范配置

初始化：`Vue3 + Vuex + Router + Less + Prettier + Eslint`。

代码格式、提交规范：EditorConfig 为不同编辑器维护一致的代码风格，`Prettier + Eslint + husky + commitizen` 保证代码符合 eslint 规范 和 git commit 规范。

## 组件库安装和工具封装

### CSS reset

安装 `normalize.css`：`yarn add normalize.css`；

在 `src/main.js` 中引入：`import 'normalize.css'`。

### Element Plus 按需导入

安装 `element-plus`：`yarn add element-plus`；

按需导入所用到的额外的插件：`yarn add -D unplugin-vue-components unplugin-auto-import`。

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

### axios 库二次封装

### localStorage 封装

### 不同环境配置不同接口，跨域问题设置接口代理
