import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'
import Element from 'element-ui'
import '@/styles/element-variables.scss'

import App from './App'
import router from './router'
import store from './store'

import './icons'
import http from '@/utils/request'

import { get, post,fetch } from '@/utils/http'

Object.defineProperties(Vue.prototype, {
    '$http': {
        value: http
    },
    '$get': {
        value: get
    },
    '$post': {
        value: post
    },
    '$q':{
        value:fetch
    }
});
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.use(Element, {
    size: Cookies.get('size') || 'medium',
})
Vue.use(preview);



Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
