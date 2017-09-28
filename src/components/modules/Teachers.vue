<template>
  <div>
    <transition name='fade' mode='out-in'>
      <app-form-add-unit 
        :type='type'
        :association='association'
      >
      </app-form-add-unit>
    </transition>
    <!-- Teachers list -->
    <transition name='fade'>
      <app-unit-table
        :type='type'
        :table_association='"lessons"'
        :association='association'
      >
      </app-unit-table>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import appFormAddUnit from '../forms/add_unit.vue';
import appUnitTable from '../tables/unit_table.vue';

  export default {
    components: {
      appFormAddUnit: appFormAddUnit,
      appUnitTable: appUnitTable
    },
    data() {
      return {
        type: 'teacher',
        association: 'lessons',
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none !important;
  }
  .label {
    text-align: left;
  }
  svg {
    padding-top: 2px;
  }
</style>