import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import addWeight from './views/AddWeight.vue';
import Login from './views/Login.vue';
import FirstTime from './views/FirstTime.vue';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/new-weight/:lastWeight',
			name: 'addWeight',
			component: addWeight,
			props: true,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				loginView: true
			}
		},
		{
			path: '/welcome',
			name: 'firstTime',
			component: FirstTime,
			meta: {
				requiresAuth: true
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	//if there's no logged in user
	if (requiresAuth && !currentUser) {
		next('login');
	} else if (!requiresAuth && currentUser) {
		//if logged in user tries access login or signup
		next('/');
	} else {
		next();
	}
});

export default router;
