<template>
  <div>
    <h2>Statistics</h2>
    <br>
    <v-client-table :data="filteredGrades" :columns="table_columns">
      <template slot="delete" scope="props">
        <span @click ='removeGrade(props.row.id)'>
            <icon style='color:red;cursor:pointer;' name='trash'></icon>
        </span>
      </template>
    </v-client-table>
  </div>
</template>

<script>

import Vue from 'vue';

  export default {
    data() {
      return {
        table_columns: ['lesson_name', 'student_name', 'teacher_name', 'grade', 'comment', 'date', 'delete'],

        grades: this.$store.grades,
        students: this.$store.students,
        lessons: this.$store.lessons,
        teachers: this.$store.teachers
      }
    },
    methods: {
      removeGrade(index) {
        if(confirm('Deleting this permanently. Continue?')){
          Vue.delete(this.$store.grades, index);
        }
      }, 
    },
    computed: {
      filteredGrades() {
        let result = [];

        //reconstruct the array with filtered data
        for (var key in this.grades){
          if (!this.grades.hasOwnProperty(key)) continue;

          //check if lesson/student/teacher in the given grade has been deleted
          let lesson_name = '';
          let student_name = '';
          let teacher_name = '';

          if(!this.lessons[this.grades[key].lesson_id]){
            lesson_name = "**Deleted lesson**"
          }else{
            lesson_name = this.lessons[this.grades[key].lesson_id].name;
          }
          if(!this.students[this.grades[key].student_id]){
            student_name = "**Deleted student**"
          }else{
            student_name = this.students[this.grades[key].student_id].name;
          }
          if(!this.teachers[this.grades[key].teacher_id]){
            teacher_name = '**Deleted teacher**'
          }else{
            teacher_name = this.teachers[this.grades[key].teacher_id].name;
          }
          
          result.push({
            id: key,
            lesson_name: lesson_name,
            student_name: student_name,
            teacher_name: teacher_name,
            date: this.grades[key].date,
            comment: this.grades[key].comment,
            grade: this.grades[key].grade
          });
        };
  
        return result;
      }
    }
  }
</script>

<style>
  
  .form-group.form-inline.pull-left.VueTables__search,
  .form-group.form-inline.pull-right.VueTables__limit {
    margin-bottom: 10px;
  }
  #VueTables__search_Ue7gR,
  #VueTables__limit_Ue7gR {
    margin-left: 5px;
  }
  .pagination.VuePagination__pagination{
    margin-bottom: 10px;
  }
  .VuePagination__pagination-item-prev-page, 
  .VuePagination__pagination-item-next-page,
  .VuePagination__pagination-item-next-chunk,
  .VuePagination__pagination-item-prev-chunk{
    background-color: #31c924;
    padding: 5px 15px;
    color: white !important;
    border-radius: 10px;
    font-weight: bolder;
  }
  .VuePagination__pagination-item.page-item{
    padding: 5px 15px;
  }
  .VuePagination__pagination-item.page-item.active{
    padding: 5px 15px;
    color: #31c924;
  }
  .VueTables__sortable {
    cursor: pointer;
  }
  @media screen and (max-width: 750px) {
    .VueTables__table {
      font-size: 9px;
      font-weight: bolder;
    }
    .VueTables__table {
      font-size: 9px;
      font-weight: bolder;
    }
    .VueTables__table tr td{
      font-size: 9px;
      font-weight: bolder;
    }
  }
  .VueTables__table tr td{
    max-width: 9999px;
    word-break: break-all;
  }
</style>