import Vue from 'vue';
import Router from 'vue-router';

import Login from './components/login.vue';
import Register from './components/register.vue';
import Home from './components/home.vue';
import Dashboard from './components/dashboard.vue';
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home,

        },
        {
            path: '/login',
            name: 'login',
            component: Login,

        },
        {
            path: '/register',
            name: 'register',
            component: Register,

        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,

        },

        // otherwise redirect to home

    ]
});