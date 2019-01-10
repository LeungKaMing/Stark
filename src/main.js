import Vue from 'vue'
import VueRouter from 'vue-router'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Notification, Container, Header, Aside, Main, Form, FormItem, Input, Select, Option, Radio, RadioGroup, Switch, ButtonGroup } from 'element-ui';
import App from './App.vue'

import './assets/css/common.css'

const List = () => import('./pages/List.vue')
const Editor = () => import('./pages/Editor.vue')

Vue.use(VueRouter)

Vue.use(ButtonGroup)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Switch);
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
