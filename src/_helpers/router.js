import Vue from 'vue';
import Router from 'vue-router';

// Components
import LoginPage from '../components/login/login.vue';
import RegisterPage from '../components/RegisterPage.vue';
import HomePage from '../components/HomePage.vue';
import TrackList from '../components/TrackList.vue';
import Settings from '../components/Settings.vue';
import SchedulingPage from '../components/SchedulingPage.vue';

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage,
            children: [
                { path: '/settings', component: Settings },
                { path: '/schedules', component: SchedulingPage },
                { path: '/tracks', component: TrackList }
            ] },
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '*', redirect: '/' }
    ]
})

router.beforeEach((to, from, next) => {
    const publicRoutes = ['/login', '/register']
    const authRequired = !publicRoutes.includes(to.path)
    const loggedIn = localStorage.getItem('user')

    if (authRequired && !loggedIn) {
        return next('/login')
    }

    next()
})