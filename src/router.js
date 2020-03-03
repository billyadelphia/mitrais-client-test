import Vue from 'vue';
import Router from 'vue-router';
import isAuthenticated from './js/customAuth';
import Login from './components/login.vue';
import Register from './components/register.vue';
import Home from './components/home.vue';
import Dashboard from './components/dashboard.vue';
Vue.use(Router);

const router = new Router({
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
    ]
});

router.beforeEach((to, from, next) => {
    isAuthenticated.then(function(isAuthenticated) {
        let nextData = { props: { auth: isAuthenticated } };
        if (to.name == 'dashboard' && !isAuthenticated) nextData = { name: 'login' };
        if (to.name === 'login' && isAuthenticated) nextData = { name: 'dashboard', props: { auth: isAuthenticated } };

        next(nextData);
    }).catch(function() {
        next({ props: { auth: false } });
    });

});



export default router;