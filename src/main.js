import Vue from 'vue';
import VueRouter from 'vue-router';
import VueStash from 'vue-stash';
import App from './App.vue';
import { routes } from './routes';
import Icon from 'vue-awesome';
import {ServerTable, ClientTable, Event} from 'vue-tables-2';

// Register external components
Vue.use(VueStash);
Vue.use(VueRouter);
Vue.component('icon', Icon);
Vue.use(ClientTable, {}, false, require('vue-tables-2/compiled/template.js')('client'))

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
      last_insert_ids: {
        teacher: 3,
        student: 7,
        subject: 2,
        grade: 13
      },
      teachers: {
        0: {
          name: 'Sandra',
          subjects: [0, 1, 2]
        },
        1: {
          name: 'Karl',
          subjects: [0, 2]
        },
        2: {
          name: 'Mary',
          subjects: [1, 2]
        },
        3: {
          name: 'John',
          subjects: [2]
        }
      },
      students: {
        0: {
          name: 'Kate'
        },
        1: {
          name: 'Britney'
        },
        2: {
          name: 'Joe'
        },
        3: {
          name: 'Raul'
        },
        4: {
          name: 'Hendrik'
        },
        5: {
          name: 'Richard'
        },
        6: {
          name: 'Mike'
        },
        7: {
          name: 'Joanna'
        }
      },
      subjects: {
        0: {
          name: 'German',
          students: [0, 1, 2, 3, 4]
        },
        1: {
          name: 'Math',
          students: [0, 3, 4, 6, 7]
        },
        2: {
          name: 'Biology',
          students: [2, 3, 7]
        }
      },
      grades: {
        0: {
          subject_id: 1,
          student_id: 3,
          teacher_id: 0,
          date: '2017-09-20',
          comment: "This is a comment",
          grade: 2
        },
        1: {
          subject_id: 0,
          student_id: 3,
          teacher_id: 0,
          date: '2017-09-20',
          comment: ".",
          grade: 4
        },
        2: {
          subject_id: 1,
          student_id: 4,
          teacher_id: 0,
          date: '2017-08-07',
          comment: "...",
          grade: 0
        },
        3: {
          subject_id: 1,
          student_id: 6,
          teacher_id: 2,
          date: '2017-08-09',
          comment: "",
          grade: 0
        },
        4: {
          subject_id: 1,
          student_id: 6,
          teacher_id: 0,
          date: '2017-08-09',
          comment: "",
          grade: 5
        },
        5: {
          subject_id: 1,
          student_id: 6,
          teacher_id: 2,
          date: '2017-08-06',
          comment: "Very good",
          grade: 5
        },
        6: {
          subject_id: 1,
          student_id: 6,
          teacher_id: 0,
          date: '2017-08-17',
          comment: "",
          grade: 4
        },
        7: {
          subject_id: 1,
          student_id: 6,
          teacher_id: 2,
          date: '2017-08-15',
          comment: "",
          grade: 1
        },
        8: {
          subject_id: 1,
          student_id: 0,
          teacher_id: 3,
          date: '2017-08-13',
          comment: "",
          grade: 4
        },
        9: {
          subject_id: 1,
          student_id: 0,
          teacher_id: 0,
          date: '2017-08-11',
          comment: "",
          grade: 3
        },
        10: {
          subject_id: 1,
          student_id: 3,
          teacher_id: 0,
          date: '2017-08-10',
          comment: "Did not do homework",
          grade: 0
        },
        11: {
          subject_id: 2,
          student_id: 2,
          teacher_id: 1,
          date: '2017-08-10',
          comment: "",
          grade: 5
        },
        12: {
          subject_id: 0,
          student_id: 1,
          teacher_id: 0,
          date: '2017-08-10',
          comment: "",
          grade: 5
        },
        13: {
          subject_id: 1,
          student_id: 0,
          teacher_id: 0,
          date: '2017-08-17',
          comment: "",
          grade: 3
        }
      }
    }
  },
  render: h => h(App)
})
