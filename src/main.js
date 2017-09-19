import Vue from 'vue';
import VueRouter from 'vue-router';
import VueStash from 'vue-stash';
import App from './App.vue';
import { routes } from './routes';
import Icon from 'vue-awesome';

Vue.use(VueStash)
Vue.use(VueRouter);
Vue.component('icon', Icon)

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
      teachers: [],
      students: [],
      lessons: [],
      grades: []
    }
  },
  render: h => h(App)
})
