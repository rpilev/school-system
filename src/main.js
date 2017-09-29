import Vue from 'vue';
import VueRouter from 'vue-router';
import VueStash from 'vue-stash';
import App from './App.vue';
import { routes } from './routes';
import Icon from 'vue-awesome';

// Register external components
Vue.use(VueStash);
Vue.use(VueRouter);
Vue.component('icon', Icon);

// Register global filters
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
)
Vue.filter('removeLastCharacter', function (value) {
    if (!value) return ''
    return value.substring(0, value.length - 1);
  }
)

// Instantiate vue-router
const router = new VueRouter({
  routes,
  mode: 'history'
})

//main vue instance
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
          lessons: [0, 2]
        },
        {
          name: 'Mary',
          lessons: [1, 2]
        },
        {
          name: 'John',
          lessons: [2]
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
          name: 'Mike'
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
          students: [0, 3, 4, 6, 7]
        },
        {
          name: 'Biology',
          students: [2, 3, 7]
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
