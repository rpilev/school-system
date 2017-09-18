<template>
  <div>
    <h2>Add Teachers</h2>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" v-model='teacher_name' type="text" placeholder="Teacher Name">
      </div>
      <br>
      <div class="control">
        <button @click='addTeacher' class="button is-primary">Submit</button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Details</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Details</th>
          <th>Remove</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for='teacher in $store.teachers'>
          <td>{{ teacher.name }}</td>
          <td style="text-align: center; color: #6ba3ff; font-weight: bolder;">
            DETAILS
          </td>
          <td style="text-align:center; color:red; font-weight: bolder;">X</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        teacher_name: ''
      }
    },
    methods: {
      addTeacher() {
        this.$store.teachers.push({ name: this.teacher_name });
        this.teacher_name = '';
      }
    }
  }
</script>

<style scoped>
  .label {
    text-align: left;
  }
</style>