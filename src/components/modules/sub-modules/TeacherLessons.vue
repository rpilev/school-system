<template>
  <div>
    <router-link to="/teachers" class="button button is-success"  active-class="active">
      Back
    </router-link>
    <h2>Teacher <i>{{ teacher_name }}</i></h2>
    <aside class="menu">
      <p class="menu-label">
        Lessons
      </p>
      <ul class="menu-list">
        <!-- List all available lessons -->
        <li v-for="(lesson, index) in all_lessons">
          <label class="checkbox">
            <!-- v-model the selection directly to the store attr -->
            <input 
              v-model='$store.teachers[teacher_id].lessons'
              :value="index"
              type="checkbox"
            >
            {{ lesson.name }}
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
        teacher_id: this.$route.params.id,
        teacher_name: this.$store.teachers[this.$route.params.id].name,
        
        all_lessons: this.$store.lessons
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