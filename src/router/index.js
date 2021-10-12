import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main' },
    component: () => import('../components/Exercises.vue'),
  },
  {
    path: '/breath',
    name: 'breath',
    meta: { layout: 'header' },
    component: () => import('../components/Breath.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(from);
  // console.log(to);

  next();
});

export default router;
