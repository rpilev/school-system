<template>
  <div>
    <app-form-add-unit 
      :type='type'
    >
    </app-form-add-unit>

    <!-- Students list -->
    <app-unit-table
      :type='type'
      :association_cleanup_refernce = "association_cleanup_refernce"
    >
    </app-unit-table>
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