import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
//const Videos = () =>import('../views/Videos.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
/*  {
    path: '/videos',
    name: 'Videos',
    component: Videos
  }*/
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
