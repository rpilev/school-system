import Vue from 'vue';
import VueRouter from 'vue-router';
import VueStash from 'vue-stash';
import App from './App.vue';
import { routes } from './routes';
import Icon from 'vue-awesome';

Vue.use(VueStash);
Vue.use(VueRouter);
Vue.component('icon', Icon);

//Global filters
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

//Global functions
Vue.mixin({
  methods: {
    // Toggels the adding form for a given unit
    toggleAddUnit() {
      // Stop editing and reset the unit_name and form_valid props just in case editing in progress
      this.editing = -1;
      this.unit_name = '';
      this.form_valid = true;

      this.showAddForm = true;
    },
    // Pushes a new unit into the store
    addUnit() {

      //validate form
      if(this.unit_name=='') {
        this.form_valid = false;
        return;
      }

      // construct a new unit
      let new_unit = { 
        name: this.unit_name
      }
      // if this unit is associated with
      // other units then include an empty
      // array of them in to the object
      new_unit[this.association] = [];

      // Push to store
      // Convert type name to plural for the store
      this.$store[this.type + 's'].push(new_unit);

      //Reset fields and close the form
      this.unit_name = '';
      this.showAddForm = false
      this.form_valid = true;
    },
    // Removes the unit and its associations
    // from the store
    removeUnit(index) {
      // Contain these in vars with let
      // for use in ananymous functions
      let type = this.type
      let association_cleanup_refernce = this.association_cleanup_refernce

      //reset editing prop just in case editing in progress 
      this.editing = -1;

      //remove associations to other units
      //if they exist
      if(association_cleanup_refernce){
        this.$store[association_cleanup_refernce].forEach(function(element){

            //check for deleted units and ignore them
            if (element == "deleted"){
              return;
            }

            if(element[type + 's'].indexOf(index) > -1){

              let index_to_remove = element[type + 's'].indexOf(index);
              element[type + 's'].splice(index_to_remove, 1);
            }
          }
        );
      }
      
      //just set the index value to 'deleted' to preserve the index numbers of the other elements
      if(confirm('This will permanently delete this student. Continue?')){
        // need to use the Vue.set method so Vue detects the change
        Vue.set(this.$store[type + 's'], index, 'deleted');
      }else{
        return;
      }
    },
    // Shows, validates and hides the edit input
    editUnit(index, lesson) {
      // Hide the add lesson form just in case its open
      this.showAddForm = false;

      //reset form_valid prop
      this.form_valid = true;

      this.editing = index;
      this.unit_name = lesson;
    },
    // Carries out a submitted edit
    submitEdit(index) {
      //validate
      if(this.unit_name == ''){
        this.form_valid = false;
        return;
      }
      //get the current unit
      let current_unit = this.$store[this.type + 's'][index];
      //replace the name prop
      current_unit.name = this.unit_name;
      //replace the old lesson obj in the store prop
      this.$store[this.type + 's'][index] = current_unit;
      //stop editing
      this.editing = -1;
    }
  },
});

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
