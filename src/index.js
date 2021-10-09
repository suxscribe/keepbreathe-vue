// JS
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './js/';
import { vars } from './js/vars';

// SCSS
import './scss/main.scss';

// Vue.js
// window.Vue = require('vue');
import Vue from 'vue';
// import VModal from 'vue-js-modal';
import store from './store/index';
import router from './router/index';
import VModal from 'vue-js-modal/dist/index.nocss.js';

Vue.use(VModal);

// Vue components (for use in html)
Vue.component(
  'exercises-component',
  require('./components/Exercises.vue').default
);
Vue.component('breath-component', require('./components/Breath.vue').default);
Vue.component('app', require('./components/App.vue').default);

// Vue init
const app = new Vue({
  el: '#app',
  router,
  store,
});

// console.log(vars);
