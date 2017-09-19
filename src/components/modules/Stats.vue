<template>
  <div>
    <ul>
      <li v-for='grade in grades'>
        {{ grade }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        grades: this.$store.grades
      }
    }
  }
</script>