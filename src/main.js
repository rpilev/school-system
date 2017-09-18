import Vue from 'vue';
import VueRouter from 'vue-router';
import VueStash from 'vue-stash';
import App from './App.vue';
import { routes } from './routes';

Vue.use(VueStash)
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  data: {
    /* VueStash Store */
    store: {
      teachers: []
    }
  },
  render: h => h(App)
})
