import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import './assets/css/base.less'

const app = createApp(App)

app.use(store).use(router).mount('#app')
