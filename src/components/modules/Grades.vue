<template>
  <div>
    <h2>Grade Students</h2>
    <transition name='fade' mode='out-in'>
      <!-- Student selection -->
      <div v-if='inquiry == "Student"' key='1' class="field">
        <!-- success message for previous grade add -->
        <p v-show="success_message" class="help is-success">Student graded</p>

        <label class="label">Student</label>
        <div class="control">
          <div class="select">
            <select @change='inquiry = "Lesson"' v-model='selected_student'>
              <option disabled selected value></option>
              <option 
                v-for='(student, index) in students'
                :value='index'
              >
                {{ student.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Lesson selection -->
      <div key='2' v-else-if='inquiry == "Lesson"' class="field">
        <label class="label">Subject</label>
        <div class="control">
          <div class="select">
            <select @change='inquiry = "Teacher"' v-model='selected_lesson' v-if='checkForResults(lessons, "students", selected_student)'>
              <option disabled selected value></option>
              <!-- v-if igores lessons that are not associated with the perviously selected student -->
              <option 
                v-for='(lesson, index) in lessons'
                v-if='lessons[index].students.indexOf(parseInt(selected_student)) > -1'
                :value='index'
              >
                {{ lesson.name }}
              </option>
            </select>
            <p v-else>
              No results found
            </p>
          </div>
        </div>
      </div>

      <!-- Teacher selection -->
      <div key='3' v-else-if='inquiry == "Teacher"' class="field">
        <label class="label">Teacher</label>
        <div class="control">
          <div class="select">
            <select @change='inquiry = "Rest"' v-model='selected_teacher' v-if="checkForResults(teachers, 'lessons', selected_lesson)">
              <option disabled selected value></option>
              <option
                v-for='(teacher, index) in teachers'
                v-if='teachers[index].lessons.indexOf(parseInt(selected_lesson)) > -1'
                :value='index'
              >
                {{ teacher.name }}
              </option>
            </select>
            <p v-else>
              No results found
            </p>
          </div>
        </div>
      </div>

      <!-- Selecting the rest -->
      <div key='4' v-else-if='inquiry == "Rest"' class="field">
        <!-- Date selection -->
        <label class="label">Date</label>
        <div class="control">
          <input v-model='selected_date' class="input" type="date" placeholder="Text input">
        </div>

        <!-- Grade selection -->
        <label class="label">Grade</label>
        <div class="control">
          <div class="select">
            <select v-model='selected_grade'>
              <option disabled selected value></option>
              <option value='0'>
                0
              </option>
              <option value='1'>
                1
              </option>
              <option value='2'>
                2
              </option>
              <option value='3'>
                3
              </option>
              <option value='4'>
                4
              </option>
              <option value='5'>
                5
              </option>
            </select>
          </div>
        </div>
       
        <!-- Comment input -->
        <label class="label">Comment</label>
        <div class="control">
          <input v-model='entered_comment' class="input" type="text" placeholder="Text input">
        </div>

        <!-- Grade selection -->
        <div style="text-align:center;">
          <button @click='submitGrade' class="button is-info">Grade</button>
        </div>
        
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        inquiry: 'Student',

        selected_lesson: -1,
        selected_student: -1,
        selected_teacher: -1,
        selected_date: -1,
        entered_comment: '',
        selected_grade: -1,

        results_found: 0,

        lessons: this.$store.lessons,
        teachers: this.$store.teachers,
        students: this.$store.students,

        success_message: false
      }
    },
    methods: {
      checkForResults(where, association, selected_unit) {
        let results = 0;
        for (var key in where) {
          if (!where.hasOwnProperty(key)) {
            continue;
          }
          console.log(key);
          if(where[key][association].indexOf(parseInt(selected_unit)) > -1)
            results++;
        }
        if(results > 0)
          return true;
        else
          return false;
      },
      submitGrade() {
        // Generate a unique id
        let id = this.$store.last_insert_ids['grade'] + 1;
        this.$store.last_insert_ids['grade'] = id;

        //construct new grade oject and push to grades array in store
        let grade = {
          lesson_id: this.selected_lesson,
          student_id: this.selected_student,
          teacher_id: this.selected_teacher,
          date: this.selected_date,
          comment: this.entered_comment,
          grade: this.selected_grade
        }

        this.$store.grades[id] = grade;

        //reset back to inital state
        this.inquiry = 'Student';

        this.selected_lesson = -1;
        this.selected_student = -1;
        this.selected_teacher = -1;
        this.selected_date = 1;
        this.entered_comment = '';
        this.selected_grade = -1;

        //add some feedback
        this.success_message = true;
      }
    }
  }
</script>