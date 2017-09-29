<template>
  <div>
    <transition name='fade' mode='out-in'>
      <a 
        v-if='!showAddForm'
        class="button is-info add-button"
        @click='toggleAddUnit'
      >Add {{ type | capitalize }}</a>

      <!-- Teacher add form -->
      <div v-else class="field">
        <h2>Add {{ type | capitalize }}</h2>
        <label class="label">Name</label>
        <div class="control">
          <input 
            :class="{ input : true, 'is-danger' : !form_valid }"
            v-model='unit_name'
            @input='form_valid = true'
            type="text"
            placeholder="Enter name"
          >
        </div>
        <p v-show='!form_valid' class="help is-danger">Please enter a name</p>
        <br>
        <div class="control">
          <button 
            @click='addUnit()'
            class="button is-primary"
          >Submit</button>
          <button 
            @click='showAddForm = false;
                    unit_name ="";
                    form_valid = true;'
            class="button is-danger"
          >Cancel</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import crudFunctions from '../../assets/mixins/crud';

  export default {
    mixins: [crudFunctions],
    props: [
      'type',
      'association'
    ],
    data() {
      return {
        showAddForm: false,
        unit_name: '',
        form_valid: true
      }
    }
  }
</script>