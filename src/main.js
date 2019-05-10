import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Viewer from 'v-viewer'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'viewerjs/dist/viewer.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import '@/icons' // icon
import '@/permission' // permission control

import MainTable from '@/components/Table/index'
import PagiNation from '@/components/Pagination/index'
import BaseDialog from '@/components/Basedialog/index'
import TreeSelect from '@/components/TreeSelect/index'
import { tableHeigh } from '@/api/variables'
import { getBtnHeigh } from '@/api/variables'

import request from '@/utils/request'

import '@/utils/btn-permission'
/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.use(Viewer)
Vue.component('main-table', MainTable)
Vue.component('pagi-nation', PagiNation)
Vue.component('base-dialog', BaseDialog)
Vue.component('tree-select', TreeSelect)

Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source'
  }
})

Vue.config.productionTip = false
Vue.prototype.$tableHeigh = tableHeigh
Vue.prototype.$getBtnHeigh = getBtnHeigh
Vue.prototype.$http = request

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
