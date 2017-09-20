<template>
  <div>
    <transition name='fade' mode='out-in'>
      <a 
        v-if='!showTeacherAddForm'
        class="button is-info add-button"
        @click='toggleAddTeacher'
      >Add Teacher</a>

      <!-- Teacher add form -->
      <div v-else class="field">
        <h2>Add Teacher</h2>
        <label class="label">Name</label>
        <div class="control">
          <input 
            :class="{ input : true, 'is-danger' : !form_valid }"
            v-model='teacher_name'
            @input='form_valid = true'
            type="text"
            placeholder="Teacher Name"
          >
        </div>
        <p v-show='!form_valid' class="help is-danger">Please enter a name</p>
        <br>
        <div class="control">
          <button @click='addTeacher()' class="button is-primary">Submit</button>
          <button @click='showTeacherAddForm = false; teacher_name =""; form_valid = true;' class="button is-danger">Cancel</button>
        </div>
      </div>
    </transition>

    <!-- Teachers list -->
    <transition name='fade'>
      <table v-show='$store.teachers.length != 0' class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <transition-group name='slide' tag="tbody">
          <!-- check if index is null for deleted items -->
          <tr :key="index" v-for='(teacher, index) in $store.teachers' v-if='teacher != null'>
            
            
            <td class="table-restricted-size">
              <transition name='slide' mode='out-in'>
                <!-- If the current index is being edited show an input field, otherwise just the name -->
                <div key='1' v-if='editing == index'>
                  <input  
                   :class="{ 'edit-input input' : true, 'is-danger' : !form_valid }"
                   type="text"
                   name=""
                   v-model="teacher_name"
                   @input="form_valid = true"
                  >
                  <button @click="submitEdit(index)" class="button is-info custom-edit-button">Ok</button>
                  <button @click="editing=-1;teacer_name=''" class="button is-danger custom-edit-button">Cancel</button>
                  <span v-show='!form_valid' class="help is-danger">Please enter a name</span>
                </div>
                  
                <div key='2' v-else>
                  {{ teacher.name }}
                </div>
              </transition>
            </td>
            <td 
              style="text-align: center;
              color: #6ba3ff;
              cursor: pointer;"
            >
              <router-link :to="'/teacher/' + index + '/lessons/'">
                {{ teacher.lessons.length }} 
                <!-- plural grammar -->
                <span v-if='teacher.lessons.length == 1'>Subject</span>
                <span v-else='teacher.lessons.length == 1'>Subjects</span>
              </router-link>
               
            </td>
            <td 
              style="cursor: pointer;
              text-align:center;
              font-weight: bolder;"
            >
              <!-- teacher name edit and delete buttons -->
              <span @click = 'editTeacher(index, teacher.name)'>
                <icon style='color:green;'  name='pencil'></icon>
              </span>
              <span @click = 'removeTeacher(index)'>
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
        showTeacherAddForm: false,
        teacher_name: '',
        form_valid: true,
        editing: -1
      }
    },
    methods: {
      toggleAddTeacher() {
        // Stop editing and reset the teacher_name and form_valid props just in case editing in progress
        this.editing = -1;
        this.teacher_name = '';
        this.form_valid = true;

        this.showTeacherAddForm = true;
      },
      addTeacher() {

        //validate form
        if(this.teacher_name=='') {
          this.form_valid = false;
          return;
        }

        //add new teacher to store

        this.$store.teachers.push({ name: this.teacher_name, lessons: [] });
        this.teacher_name = '';
        this.showTeacherAddForm = false
        this.form_valid = true;
      },
      removeTeacher(index) {
        //reset editing prop just in case editing in progress 
        this.editing = -1;

        //just set the index value to null to preserve the index numbers of the other elements
        if(confirm('This will permanently delete this teacher. Continue?')){
          // need to use the Vue.set method so Vue detects the change
          Vue.set(this.$store.teachers, index, null);
        }
      },
      editTeacher(index, teacher) {
        // Hide the add teacher from just in case its open
        this.showTeacherAddForm = false;

        //reset form_valid prop
        this.form_valid = true;

        this.editing = index;
        this.teacher_name = teacher;
      },
      submitEdit(index) {
        //validate
        if(this.teacher_name == ''){
          this.form_valid = false;
          return;
        }
        //get the current teacher
        let current_teacher = this.$store.teachers[index];
        //replace the name prop
        current_teacher.name = this.teacher_name;
        //replace the old teacher obj in the store prop
        this.$store.teachers[index] = current_teacher;
        //stop editing
        this.editing = -1;
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none !important;
  }
  .label {
    text-align: left;
  }
  svg {
    padding-top: 2px;
  }
</style>