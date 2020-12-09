// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
require('./scss/global') // 这里用require如果用import那么就必须放在router下，因为import运行是调用，require是编译时调用
import router from './router'
//import wxs from '@/js/wxs'
//Vue.use(wxs)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
