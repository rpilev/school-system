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
      teachers: [
        {
          name: 'Teacher 1',
          lessons: [1, 2]
        },
        {
          name: 'Teacher 2',
          lessons: [2, 3]
        },
        {
          name: 'Teacher 3',
          lessons: [3, 4]
        }
      ],
      students: [
        {
          name: 'Student 1'
        },
        {
          name: 'Student 2'
        },
        {
          name: 'Student 3'
        },
        {
          name: 'Student 4'
        }
      ],
      lessons: [
        {
          name: 'lesson 1',
          students: [1, 2]
        },
        {
          name: 'lesson 2',
          students: [3, 4]
        },
        {
          name: 'lesson 3',
          students: [2, 3]
        },
        {
          name: 'lesson 4',
          students: [1, 2]
        }
      ],
      grades: []
    }
  },
  render: h => h(App)
})
