<template>
  <div>
    <app-association-table
      :id = "subject_id"
      :type = "'subjects'"
      :association = "'students'"
    >
    </app-association-table>
  </div>
</template>

<script>
import AssociationTable from '../../tables/association_table.vue';

  export default {
    components: {
      AppAssociationTable: AssociationTable
    },
    data() {
      return {
        subject_id: this.$route.params.id,
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