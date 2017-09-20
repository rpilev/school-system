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
          name: 'Sandra',
          lessons: [0, 1, 2]
        },
        {
          name: 'Karl',
          lessons: [2, 3]
        },
        {
          name: 'Mary',
          lessons: [1, 3, 4]
        },
        {
          name: 'John',
          lessons: [4]
        }
      ],
      students: [
        {
          name: 'Kate'
        },
        {
          name: 'Britney'
        },
        {
          name: 'Joe'
        },
        {
          name: 'Raul'
        },
        {
          name: 'Hendrik'
        },
        {
          name: 'Richard'
        },
        {
          name: 'Michelle'
        },
        {
          name: 'Joanna'
        }
      ],
      lessons: [
        {
          name: 'German',
          students: [0, 1, 2, 3, 4]
        },
        {
          name: 'Math',
          students: [0, 3, 4, 6, 8]
        },
        {
          name: 'Biology',
          students: [2, 3, 8]
        }
      ],
      grades: [
        {
          lesson_id: 1,
          student_id: 3,
          teacher_id: 0,
          date: '2017-09-20',
          comment: "This is a comment",
          grade: 2
        },
        {
          lesson_id: 0,
          student_id: 3,
          teacher_id: 0,
          date: '2017-09-20',
          comment: ".",
          grade: 4
        },
        {
          lesson_id: 1,
          student_id: 4,
          teacher_id: 0,
          date: '2017-08-07',
          comment: "...",
          grade: 0
        },
        {
          lesson_id: 1,
          student_id: 6,
          teacher_id: 2,
          date: '2017-08-09',
          comment: "",
          grade: 0
        },
        {
          lesson_id: 1,
          student_id: 6,
          teacher_id: 0,
          date: '2017-08-09',
          comment: "",
          grade: 5
        },
        {
          lesson_id: 1,
          student_id: 6,
          teacher_id: 2,
          date: '2017-08-06',
          comment: "Very good",
          grade: 5
        },
        {
          lesson_id: 1,
          student_id: 6,
          teacher_id: 0,
          date: '2017-08-17',
          comment: "",
          grade: 4
        },
        {
          lesson_id: 1,
          student_id: 6,
          teacher_id: 2,
          date: '2017-08-15',
          comment: "",
          grade: 1
        },
        {
          lesson_id: 1,
          student_id: 0,
          teacher_id: 3,
          date: '2017-08-13',
          comment: "",
          grade: 4
        },
        {
          lesson_id: 1,
          student_id: 0,
          teacher_id: 0,
          date: '2017-08-11',
          comment: "",
          grade: 3
        },
        {
          lesson_id: 1,
          student_id: 3,
          teacher_id: 0,
          date: '2017-08-10',
          comment: "Did not do homework",
          grade: 0
        },
        {
          lesson_id: 2,
          student_id: 2,
          teacher_id: 1,
          date: '2017-08-10',
          comment: "",
          grade: 5
        },
        {
          lesson_id: 0,
          student_id: 1,
          teacher_id: 0,
          date: '2017-08-10',
          comment: "",
          grade: 5
        },
        {
          lesson_id: 1,
          student_id: 0,
          teacher_id: 0,
          date: '2017-08-17',
          comment: "",
          grade: 3
        }
      ]
    }
  },
  render: h => h(App)
})
