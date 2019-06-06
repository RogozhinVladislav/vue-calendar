import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AddEvent from './views/AddEvent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEvent,
    },
  ],
});
