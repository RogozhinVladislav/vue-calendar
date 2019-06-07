import Vue from 'vue';
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import router from './router';
import store from './store';
import App from './App.vue';
import './registerServiceWorker';

import theme from './styles/theme';

import 'reset-css/reset.css';
import './styles/global.scss';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
