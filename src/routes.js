import MainApp from './App.vue';
import Stats from './components/modules/Stats.vue';
import Teachers from './components/modules/Teachers.vue';
import Students from './components/modules/Students.vue';
import Grades from './components/modules/Grades.vue';
import Lessons from './components/modules/Lessons.vue';

import TeacherLessons from './components/modules/sub-modules/TeacherLessons.vue';
import LessonStudents from './components/modules/sub-modules/LessonStudents.vue';

export const routes = [
  /*main paths */
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
  },
  /* sub-sections */
  {
    path: '/teacher/:id/lessons/',
    component: TeacherLessons
  },
  {
    path: '/lesson/:id/students/',
    component: LessonStudents
  }
]