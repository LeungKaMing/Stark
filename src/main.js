import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Notification, Container, Dialog, Header, Aside, Main, Form, FormItem, Input, Select, Option, Radio, RadioGroup, Switch, ButtonGroup, Table, TableColumn } from 'element-ui';
import App from './App.vue'

import './assets/css/common.css'

const List = () => import('./pages/List.vue')
const Editor = () => import('./pages/Editor.vue')

Vue.use(VueRouter)

Vue.use(ButtonGroup)
Vue.use(Button)
Vue.use(Container)
Vue.use(Dialog)
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
Vue.use(Table);
Vue.use(TableColumn);
Vue.prototype.$notify = Notification;

const router = new VueRouter({
  routes: [
    { path: '/list', component: List },
    { path: '/editor', component: Editor },
    { path: '*', redirect: '/list' }
  ]
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
