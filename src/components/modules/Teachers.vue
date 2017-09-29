<template>
  <div>
    <app-form-add-unit 
      :type='type'
      :association='association'
    >
    </app-form-add-unit>

    <!-- Teachers list -->
    <app-unit-table
      :type='type'
      :association='association'
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
      appFormAddUnit: appFormAddUnit,
      appUnitTable: appUnitTable
    },
    data() {
      return {
        type: 'teacher',
        association: 'lessons',
        association_cleanup_refernce: 'null'
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