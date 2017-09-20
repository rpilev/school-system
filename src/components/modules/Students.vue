<template>
  <div>
    <transition name='fade' mode='out-in'>
      <a 
        v-if='!showStudentAddForm'
        class="button is-info add-button"
        @click='toggleAddStudent'
      >Add Student</a>

      <!-- Student add form -->
      <div v-else class="field">
        <h2>Add Student</h2>
        <label class="label">Name</label>
        <div class="control">
          <input 
            :class="{ input : true, 'is-danger' : !form_valid }"
            v-model='student_name'
            @input='form_valid = true'
            type="text"
            placeholder="Student Name"
          >
        </div>
        <p v-show='!form_valid' class="help is-danger">Please enter a name</p>
        <br>
        <div class="control">
          <button @click='addStudent()' class="button is-primary">Submit</button>
          <button @click='showStudentAddForm = false; student_name =""; form_valid = true;' class="button is-danger">Cancel</button>
        </div>
      </div>
    </transition>

    <!-- Students list -->
    <transition name='fade'>
      <table v-show='$store.students.length != 0' class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <transition-group name='slide' tag="tbody">
          <!-- check if index is null for deleted items -->
          <tr :key="index" v-for='(student, index) in $store.students' v-if='student != null'>
            
            
            <td class="table-restricted-size">
              <transition name='slide' mode='out-in'>
                <!-- If the current index is being edited show an input field, otherwise just the name -->
                <div key='1' v-if='editing == index'>
                  <input  
                   :class="{ 'edit-input input' : true, 'is-danger' : !form_valid }"
                   type="text"
                   name=""
                   v-model="student_name"
                   @input="form_valid = true"
                  >
                  <button @click="submitEdit(index)" class="button is-info custom-edit-button">Ok</button>
                  <button @click="editing=-1;teacer_name=''" class="button is-danger custom-edit-button">Cancel</button>
                  <span v-show='!form_valid' class="help is-danger">Please enter a name</span>
                </div>
                  
                <div key='2' v-else>
                  {{ student.name }}
                </div>
              </transition>
            </td>
            <td 
              style="cursor: pointer;
              text-align:center;
              font-weight: bolder;"
            >
              <!-- student name edit and delete buttons -->
              <span @click = 'editStudent(index, student.name)'>
                <icon style='color:green;'  name='pencil'></icon>
              </span>
              <span @click = 'removeStudent(index)'>
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
        showStudentAddForm: false,
        student_name: '',
        form_valid: true,
        editing: -1
      }
    },
    methods: {
      toggleAddStudent() {
        // Stop editing and reset the student_name and form_valid props just in case editing in progress
        this.editing = -1;
        this.student_name = '';
        this.form_valid = true;

        this.showStudentAddForm = true;
      },
      addStudent() {

        //validate form
        if(this.student_name=='') {
          this.form_valid = false;
          return;
        }

        //add new student to store

        this.$store.students.push({ name: this.student_name });
        this.student_name = '';
        this.showStudentAddForm = false
        this.form_valid = true;
      },
      removeStudent(index) {
        //reset editing prop just in case editing in progress 
        this.editing = -1;

        //just set the index value to null to preserve the index numbers of the other elements
        if(confirm('This will permanently delete this student. Continue?')){
          // need to use the Vue.set method so Vue detects the change
          Vue.set(this.$store.students, index, null);
        }else{
          return;
        }

        //remove associations to any lessons
        this.$store.lessons.forEach(function(element){
          //check for deleted lessons and ignore them
          if (element == null){
            return;
          }
          if(element.students.indexOf(index) > -1){

            let index_to_remove = element.students.indexOf(index);
            element.students.splice(index_to_remove, 1);
          }
        });
      },
      editStudent(index, student) {
        // Hide the add student from just in case its open
        this.showStudentAddForm = false;

        //reset form_valid prop
        this.form_valid = true;

        this.editing = index;
        this.student_name = student;
      },
      submitEdit(index) {
        //validate
        if(this.student_name == ''){
          this.form_valid = false;
          return;
        }
        //get the current student
        let current_student = this.$store.students[index];
        //replace the name prop
        current_student.name = this.student_name;
        //replace the old student obj in the store prop
        this.$store.students[index] = current_student;
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
</style>