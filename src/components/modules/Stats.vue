<template>
  <div>
    <h2>Statistics</h2>
    <br>

    <h4 class="subtitle is-4">All Grades</h4>
    <label class="label">Search</label>
    <div class="control">
      <input type="radio" value="lesson" v-model="search_type"> <span>Subject</span>
      <input type="radio" value="student" v-model="search_type"> <span>Student</span>
      <input type="radio" value="teacher" v-model="search_type"> <span>Teacher</span>
      <input type="radio" value="date" v-model="search_type"> <span>Date</span>
    </div>
    <div class="control" style="margin-bottom:9px;margin-top:2px;">
      <input type="text" v-model='search'>
    </div>
    <table id="myTable" class="table">
      <thead>
        <tr>
          <th @click="sortBy('lesson_name')">Subject</th>
          <th @click="sortBy('student_name')">Student</th>
          <th @click="sortBy('teacher_name')">Teacher</th>
          <th @click="sortBy('grade')">Grade</th>
          <th style="cursor: default">Comment</th>
          <th @click="sortBy('date')">Date</th>
          <th style="cursor: default">Remove</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Subject</th>
          <th>Student</th>
          <th>Teacher</th>
          <th>Grade</th>
          <th>Comment</th>
          <th>Date</th>
          <th>Remove</th>
        </tr>
      </tfoot>
      <!-- animation for deleting -->
      <transition-group name='slide' tag="tbody">
        <!-- list all grades in formatted from -->
        <tr :key="index" v-for='(grade, index) in filteredGrades' v-if="grade !== 'null'">
          <td class="table-restricted-size">{{ grade.lesson_name }}</td>
          <td class="table-restricted-size">{{ grade.student_name }}</td>
          <td class="table-restricted-size">{{ grade.teacher_name }}</td>
          <td class="table-restricted-size">{{ grade.grade }}</td>
          <td class="table-restricted-size">{{ grade.comment }}</td>
          <td class="table-restricted-size">{{ grade.date }}</td>
          <td class="table-restricted-size" style="text-align: center;">
            <span @click = 'removeGrade(grade.index)'>
                <icon style='color:red;cursor:pointer;' name='trash'></icon>
            </span>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
  export default {
    data() {
      return {
        
        inquiry: false,
        inquiry_result: [],

        search_type: 'lesson',
        search: '',
        sort_type: 'lesson_name',
        sort_type_reverse: false,

        grades: this.$store.grades,
        students: this.$store.students,
        lessons: this.$store.lessons,
        teachers: this.$store.teachers
      }
    },
    methods: {
      removeGrade(index) {
        if(confirm('This will permanently delete this lesson. Continue?')){
          // need to use the Vue.set method so Vue detects the change
          Vue.set(this.$store.grades, index, null);
        }
      }, 
      dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
        }
        return function (a,b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
        }
      },
      sortBy(element) {
        //check if already sorting by this
        if(this.sort_type == element){
          //set to reverse or unreverse
          this.sort_type_reverse = !this.sort_type_reverse;
        }else{
          this.sort_type = element;
          this.sort_type_reverse = false;
        }
      }
    },
    computed: {
      filteredGrades() {
        let result = [];
        var self = this;

        //reconstruct the array with filtered data
        this.grades.forEach(function(element, index){

          //check for null values (deleted)
          if(element == null){
            //keep it null
            result.push('null');

            return;
          }

          let lesson_name = self.lessons[element.lesson_id].name;
          let student_name = self.students[element.student_id].name;
          let teacher_name = self.teachers[element.teacher_id].name;


          //filter based on search
          let to_search = '';

          switch (self.search_type) {
            case 'lesson':
              to_search = lesson_name;
              break;
            case 'student':
              to_search = student_name;
              break;
            case 'teacher':
              to_search = teacher_name;
              break;
          }

          if(to_search.toLowerCase().indexOf(self.search.toLowerCase()) == -1){
            return;
          }

          //retain index for deleting as prop "original_index"
          result.push({
            index: index,
            lesson_name: lesson_name,
            student_name: student_name,
            teacher_name: teacher_name,
            date: element.date,
            comment: element.comment,
            grade: element.grade
          });
        });

        //sort
        result.sort(self.dynamicSort(self.sort_type));
        //check if needs to be reverse (clicked the element again)
        if(self.sort_type_reverse){
          result.reverse();
        }

        return result;
      }
    }
  }
</script>

<style scoped>
  @media screen and (max-width: 750px) {
    table {
      font-size: 9px;
    }
  }

  table th {
    cursor: pointer;
  }
</style>