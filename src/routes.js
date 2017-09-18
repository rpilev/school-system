import MainApp from './App.vue';
import Stats from './components/modules/Stats.vue';
import Teachers from './components/modules/Teachers.vue';
import Students from './components/modules/Students.vue';
import Grades from './components/modules/Grades.vue';
import Lessons from './components/modules/Lessons.vue';

export const routes = [
  {
    path: '/',
    component: Stats
  },
  {
    path: '/teachers',
    component: Teachers
  },
  {
    path: '/students',
    component: Students
  },
  {
    path: '/grades',
    component: Grades
  },
  {
    path: '/lessons',
    component: Lessons
  }
]