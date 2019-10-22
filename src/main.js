import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

import { router } from './_helpers';
import { store } from './_store';

Vue.use(ElementUI, { locale })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
