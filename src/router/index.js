import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    meta: { layout: 'main' },
    component: () => import('../components/ExercisesList.vue'),
  },
  {
    path: '/breath',
    name: 'breath',
    meta: { layout: 'breath' },
    component: () => import('../components/BreathPractice.vue'),
  },
  {
    path: '*',
    name: 'not-found',
    meta: { layout: 'main' },
    component: () => import('../components/NotFound.vue'),
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
