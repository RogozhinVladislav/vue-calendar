import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Calendar from './views/Calendar.vue';
import AddEvent from './views/AddEvent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/add-event/:type',
      name: 'add-event',
      component: AddEvent,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
