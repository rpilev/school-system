<template>
  <div>
    <router-link to="/lessons" class="button button is-success"  active-class="active">
      Back
    </router-link>
    <h2>Lesson <i>{{ lesson_name }}</i></h2>
    <aside class="menu">
      <p class="menu-label">
        Lessons
      </p>
      <ul class="menu-list">
        <!-- List all available lessons -->
        <li v-for="(student, index) in all_students">
          <label class="checkbox">
            <input @click='logit'
              v-model='$store.lessons[lesson_id].students'
              :value="index"
              type="checkbox"
            >
            {{ student.name }}
          </label>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lesson_id: this.$route.params.id,
        lesson_name: this.$store.lessons[this.$route.params.id].name,
        
        all_students: this.$store.students
      }
    },
    methods: {
      logit(){
        console.log(this.$store.lessons[this.lesson_id].students);
      }
    }
  }
</script>

<style scoped>
  label {
    font-size: 22px;
    color: rgb(92, 92, 92);
  }
</style>