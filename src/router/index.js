import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main' },
    component: () => import('../components/ExercisesList.vue'),
  },
  {
    path: '/breath',
    name: 'breath',
    meta: { layout: 'breath' },
    component: () => import('../components/BreathPractice.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
