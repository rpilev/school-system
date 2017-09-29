<template>
  <div>
    <transition name='fade' mode='out-in'>
      <app-form-add-unit 
        :type='type'
      >
      </app-form-add-unit>
    </transition>

    <!-- Students list -->
    <transition name='fade'>
      <app-unit-table
        :type='type'
        :association_cleanup_refernce = "association_cleanup_refernce"
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
      appUnitTable: appUnitTable,
      appFormAddUnit: appFormAddUnit
    },
    data() {
      return {
        type: 'student',
        association_cleanup_refernce: 'lessons'
      }
    }
  }
</script>

<style scoped>
  .label {
    text-align: left;
  }
  svg {
    padding-top: 2px;
  }
</style>