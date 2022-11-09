// JS
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './js/';

// SCSS
import './scss/main.scss';

// Vue.js
// window.Vue = require('vue');
import Vue from 'vue';
// import VModal from 'vue-js-modal';
import store from './store/index';
import router from './router/index';
import VModal from 'vue-js-modal/dist/index.nocss.js';
import localizeFilter from './filters/localize.filter';
import localizeDataFilter from './filters/localizeData.filter';

Vue.use(VModal);

// Vue components (for use in html)
Vue.component('app', require('./components/App.vue').default);
Vue.component(
  'exercises-list',
  require('./components/ExercisesList.vue').default
);
Vue.component(
  'breath-practice',
  require('./components/BreathPractice.vue').default
);
Vue.filter('localize', localizeFilter);
Vue.filter('localizeData', localizeDataFilter);

// Vue init
const app = new Vue({
  el: '#app',
  router,
  store,
});

// console.log(vars);

// some svg magic. SVG to shadow root
function requireAll(r) {
  r.keys().forEach(r);
  console.log(r);
}
requireAll(require.context('/src/svg/', true, /\.svg$/));
