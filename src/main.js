import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore';
let app = '';

firebase.initializeApp({
	apiKey: 'AIzaSyApQOEsN41Q-OydAMVoO1B_GSz5SS6D9SU',
	authDomain: 'scalogram-io.firebaseapp.com',
	databaseURL: 'https://scalogram-io.firebaseio.com',
	projectId: 'scalogram-io',
	storageBucket: 'scalogram-io.appspot.com',
	messagingSenderId: '539114218307',
	appId: '1:539114218307:web:74bf0caa703e3ac7'
});
export const db = firebase.firestore();

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			render: (h) => h(App)
		}).$mount('#app');
	}
});
