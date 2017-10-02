<template>
  <div>
    <router-link :to="'/' + type" class="button button is-success"  active-class="active">
        Back
    </router-link>
    <h2><i>{{ type_name }}</i></h2>
    <aside class="menu">
      <p class="menu-label">
        {{ association }}
      </p>
      <ul class="menu-list">
        <!-- List all students -->
        <li v-for="(unit, index) in all_associations">
          <label class="checkbox">
            <input
              v-model='$store.data[type][id][association]'
              :value="parseInt(index)"
              type="checkbox"
            >
            {{ unit.name }}
          </label>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
  export default {
    props: ['id', 'type', 'association'],
    data() {
      return {
        type_name: this.$store.data[this.type][this.id].name,
        
        all_associations: this.$store.data[this.association]
      }
    }
  }
</script>

<style>
  
</style>