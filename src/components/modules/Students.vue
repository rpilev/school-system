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
          <tr :key="index" v-for='(student, index) in $store.students'>
            
            <!-- If the current index is being edited show an input field, otherwise just the name -->
            <td class="table-name-row">
              <transition name='slide' mode='out-in'>
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

        if(confirm('This will permanently delete this student. Continue?'))
          this.$store.students.splice(index, 1);
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