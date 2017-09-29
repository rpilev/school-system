<template>
  <div>
    <transition name='fade'>
      <table v-show='$store[type + "s"].length != 0' class="table">
        <thead>
          <tr>
            <th>Name</th>
            <!-- only show if this table requires associations -->
            <th v-if='association'>{{ association | capitalize }}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Name</th>
            <th v-if='association'>{{ association | capitalize }}</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <transition-group name='slide' tag="tbody">
          <!-- check if index for deleted items -->
          <tr
            :key="index"
            v-for='(unit, index) in $store[type + "s"]'
            v-if='unit != "deleted"'>
            
            
            <td class="table-restricted-size">
              <transition name='slide' mode='out-in'>
                <!-- If the current index is being edited show an input field, otherwise just the name -->
                <div key='1' v-if='editing == index'>
                  <input  
                   :class="{ 'edit-input input' : true, 'is-danger' : !form_valid }"
                   type="text"
                   name=""
                   v-model="unit_name"
                   @input="form_valid = true"
                  >
                  <button @click="submitEdit(index)" class="button is-info custom-edit-button">Ok</button>
                  <button @click="editing=-1;unit_name=''" class="button is-danger custom-edit-button">Cancel</button>
                  <span v-show='!form_valid' class="help is-danger">Please enter a name</span>
                </div>
                  
                <div key='2' v-else>
                  {{ unit.name }}
                </div>
              </transition>
            </td>
            <td  
              v-if='association'
              style="text-align: center;
              color: #6ba3ff;
              cursor: pointer;"
            >
              <router-link :to="'/'+ type +'/' + index + '/' + association + '/'">
                {{  unit[association].length }}
                <!-- plural grammar -->
                <span v-if='unit[association].length == 1'>{{ association | capitalize | removeLastCharacter }}</span>
                <span v-else>{{ association | capitalize }}</span>
              </router-link>
            </td>
            <td 
              style="cursor: pointer;
              text-align:center;
              font-weight: bolder;"
            >
              <!-- lesson name edit and delete buttons -->
              <span @click = 'editUnit(index, unit.name)'>
                <icon style='color:green;'  name='pencil'></icon>
              </span>
              <span @click = 'removeUnit(index)'>
                <icon style='color:red;'  name='trash'></icon>
              </span>
            </td>
          </tr>
        </transition-group>
      </table>
    </transition>
  </div>
</template>

<script>
  import crudFunctions from '../../assets/mixins/crud';

  export default {
    mixins: [crudFunctions],
    props: [
      'type',
      'association',
      'association_cleanup_refernce'
    ],
    data() {
      return {
        unit_name: '',
        form_valid: true,
        editing: -1
      }
    }
  }
</script>