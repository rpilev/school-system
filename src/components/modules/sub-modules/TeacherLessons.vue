<template>
  <div>
    <router-link to="/teachers" class="button button is-success"  active-class="active">
      Back
    </router-link>
    <h2>Teacher <i>{{ teacher_name }}</i></h2>
    <aside class="menu">
      <p class="menu-label">
        Subjects
      </p>
      <ul class="menu-list">
        <!-- List all lessons (if not null /deleted) -->
        <li v-for="(lesson, index) in all_lessons" v-if="lesson != 'deleted'">
          <label class="checkbox">
            <!-- v-model the selection directly to the store attr -->
            <input 
              v-model='$store.teachers[teacher_id].lessons'
              :value="parseInt(index)"
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