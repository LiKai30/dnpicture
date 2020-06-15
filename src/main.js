import Vue from 'vue'
import App from './App'
import request from './utils/request'

Vue.config.productionTip = false
// 挂载自己的请求函数
Vue.prototype.request = request

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
