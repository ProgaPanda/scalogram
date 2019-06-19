import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
	projectId: 'scalogram-io',
	databaseURL: 'https://scalogram-io.firebaseio.com'
});
export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app');
