import MainApp from './App.vue';
import Stats from './components/modules/Stats.vue';
import Teachers from './components/modules/Teachers.vue';
import Students from './components/modules/Students.vue';
import Grades from './components/modules/Grades.vue';
import Subjects from './components/modules/Subjects.vue';

import TeacherSubjects from './components/modules/sub-modules/TeacherSubjects.vue';
import SubjectStudents from './components/modules/sub-modules/SubjectStudents.vue';

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
    path: '/subjects',
    component: Subjects
  },
  /* sub-sections */
  {
    path: '/teacher/:id/subjects/',
    component: TeacherSubjects
  },
  {
    path: '/subject/:id/students/',
    component: SubjectStudents
  }
]