import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import ru from 'vuetify/es5/locale/ru';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'moment/locale/ru';

import router from './router';
import store from './store';

import App from './App.vue';
import './registerServiceWorker';

import 'reset-css/reset.css';
import './styles/global.scss';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    // primary: '#ffffff',
    // secondary: '#b0bec5',
    accent: '#f44336',
    error: '#b71c1c',
  },
  lang: {
    locale: ru,
    current: 'ru',
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
