import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount('#app');
