import Vue from 'vue'
import VueRouter from 'vue-router'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Notification, Container, Header, Aside, Main } from 'element-ui';
import App from './App.vue'

import './assets/common.css'

const List = () => import('./pages/List.vue')
const Editor = () => import('./pages/Editor.vue')

Vue.use(VueRouter)

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.prototype.$notify = Notification;

const router = new VueRouter({
  routes: [
    { path: '/list', component: List },
    { path: '/editor', component: Editor }
  ]
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
