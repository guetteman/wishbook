import './assets/css/main.css';

import Vue from 'vue';

import VueRouter from 'vue-router';
import routes from './routes';

import App from './App.vue';
import Card from './components/Card';

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: 'history'
});

Vue.component('card', Card);

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
