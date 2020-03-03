import axios from 'axios';
import Vue from 'vue';
import VueAuth from '@websanova/vue-auth';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import Index from './components/index.vue';
import auth from './js/auth';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Set Vue globally
window.Vue = Vue;
// Set Vue router
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.router = router;
Vue.use(VueRouter);
// Set Vue authentication
Vue.use(VueAxios, axios);
axios.defaults.baseURL = `${process.env.HOST}/api` || `http://localhost:8081/api`;
Vue.use(VueAuth, auth);
// Load Index

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
    router,
    render: h => h(Index)
}).$mount('#app');