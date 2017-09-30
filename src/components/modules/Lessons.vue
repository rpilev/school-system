<template>
  <div>
    <app-form-add-unit 
      :type='type'
      :association='association'
    >
    </app-form-add-unit>

    <!-- Lessons list -->
    <app-unit-table
      :type='type'
      :association='association'
      :association_cleanup_refernce = 'association_cleanup_refernce'
    > 
    </app-unit-table>
  </div>
</template>

<script>
import appFormAddUnit from '../forms/add_unit.vue';
import appUnitTable from '../tables/unit_table.vue';

  export default {
    components: {
      appFormAddUnit: appFormAddUnit,
      appUnitTable: appUnitTable
    },
    data() {
      return {
        type: 'lesson',
        association: 'students',
        association_cleanup_refernce: 'teachers'
      }
    }
  }
</script>

<style scoped>

  table {
    font-size: 18px !important;
  }
  .label {
    text-align: left;
  }
  svg {
    padding-top: 2px;
  }
</style>