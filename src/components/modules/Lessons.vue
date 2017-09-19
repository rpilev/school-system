<template>
  <div>
    <transition name='fade' mode='out-in'>
      <a 
        v-if='!showLessonAddForm'
        class="button is-info add-button"
        @click='toggleAddLesson'
      >Add Subject</a>

      <!-- Lesson add form -->
      <div v-else class="field">
        <h2>Add Subject</h2>
        <label class="label">Name</label>
        <div class="control">
          <input 
            :class="{ input : true, 'is-danger' : !form_valid }"
            v-model='lesson_name'
            @input='form_valid = true'
            type="text"
            placeholder="Subject Name"
          >
        </div>
        <p v-show='!form_valid' class="help is-danger">Please enter a name</p>
        <br>
        <div class="control">
          <button @click='addLesson()' class="button is-primary">Submit</button>
          <button @click='showLessonAddForm = false; lesson_name =""; form_valid = true;' class="button is-danger">Cancel</button>
        </div>
      </div>
    </transition>

    <!-- Lessons list -->
    <transition name='fade'>
      <table v-show='$store.lessons.length != 0' class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Students</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <transition-group name='slide' tag="tbody">
          <!-- check if index is null for deleted items -->
          <tr :key="index" v-for='(lesson, index) in $store.lessons' v-if='lesson != null'>
            
            
            <td class="table-name-row">
              <transition name='slide' mode='out-in'>
                <!-- If the current index is being edited show an input field, otherwise just the name -->
                <div key='1' v-if='editing == index'>
                  <input  
                   :class="{ 'edit-input input' : true, 'is-danger' : !form_valid }"
                   type="text"
                   name=""
                   v-model="lesson_name"
                   @input="form_valid = true"
                  >
                  <button @click="submitEdit(index)" class="button is-info custom-edit-button">Ok</button>
                  <button @click="editing=-1;teacer_name=''" class="button is-danger custom-edit-button">Cancel</button>
                  <span v-show='!form_valid' class="help is-danger">Please enter a name</span>
                </div>
                  
                <div key='2' v-else>
                  {{ lesson.name }}
                </div>
              </transition>
            </td>
            <td 
              style="text-align: center;
              color: #6ba3ff;
              cursor: pointer;"
            >
              <router-link :to="'/lesson/' + index + '/students/'">
                {{  lesson.students.length }}
                <!-- plural grammar -->
                <span v-if='lesson.students.length == 1'>Student</span>
                <span v-else='lesson.students.length == 1'>Students</span>
              </router-link>
            </td>
            <td 
              style="cursor: pointer;
              text-align:center;
              font-weight: bolder;"
            >
              <!-- lesson name edit and delete buttons -->
              <span @click = 'editLesson(index, lesson.name)'>
                <icon style='color:green;'  name='pencil'></icon>
              </span>
              <span @click = 'removeLesson(index)'>
                <icon style='color:red;'  name='trash'></icon>
              </span>
            </td>
          </tr>
        </transition-group>
      </table>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
  export default {
    data() {
      return {
        showLessonAddForm: false,
        lesson_name: '',
        form_valid: true,
        editing: -1
      }
    },
    methods: {
      toggleAddLesson() {
        // Stop editing and reset the lesson_name and form_valid props just in case editing in progress
        this.editing = -1;
        this.lesson_name = '';
        this.form_valid = true;

        this.showLessonAddForm = true;
      },
      addLesson() {

        //validate form
        if(this.lesson_name=='') {
          this.form_valid = false;
          return;
        }

        //add new lesson to store

        this.$store.lessons.push({ name: this.lesson_name, students: [] });
        this.lesson_name = '';
        this.showLessonAddForm = false
        this.form_valid = true;
      },
      removeLesson(index) {
        //reset editing prop just in case editing in progress 
        this.editing = -1;

        //just set the index value to null to preserve the index numbers of the other elements
        if(confirm('This will permanently delete this lesson. Continue?')){
          // need to use the Vue.set method so Vue detects the change
          Vue.set(this.$store.lessons, index, null);
        }

        //remove associations to any teachers
        this.$store.teachers.forEach(function(element){
          //check for deleted lessons and ignore them
          if (element == null){
            return;
          }
          if(element.lessons.indexOf(index) > -1){
            let index_to_remove = element.lessons.indexOf(index);
            element.lessons.splice(index_to_remove, 1);
          }

        });
      },
      editLesson(index, lesson) {
        // Hide the add lesson from just in case its open
        this.showLessonAddForm = false;

        //reset form_valid prop
        this.form_valid = true;

        this.editing = index;
        this.lesson_name = lesson;
      },
      submitEdit(index) {
        //validate
        if(this.lesson_name == ''){
          this.form_valid = false;
          return;
        }
        //get the current lesson
        let current_lesson = this.$store.lessons[index];
        //replace the name prop
        current_lesson.name = this.lesson_name;
        //replace the old lesson obj in the store prop
        this.$store.lessons[index] = current_lesson;
        //stop editing
        this.editing = -1;
      }
    }
  }
</script>

<style scoped>
  .label {
    text-align: left;
  }
  svg {
    padding-top: 2px;
  }

  /* Transition animations */
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 0.3s;
  }
  .fade-leave {
    opacity: 1;
  }
  .fade-leave-active {
    transition: opacity 0.3s;
    opacity: 0;
  }

  .slide-enter {
    opacity: 0;
  }
  .slide-enter-active {
    animation: slide-in 0.3s ease-in-out forwards;
    transition: opacity 0.3s;
  }
  .slide-leave {
    opacity: 1;
  }
  .slide-leave-active {
    animation: slide-out 0.3s ease-in-out forwards;
    transition: opacity 0.3s;
    opacity: 0;
  }

  @keyframes slide-in {
    0% {
      transform: translateX(40px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  @keyframes slide-out {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(40px);
    }
  }
</style>