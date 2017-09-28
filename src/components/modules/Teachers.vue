<template>
  <div>
    <transition name='fade' mode='out-in'>
      <a 
        v-if='!showAddForm'
        class="button is-info add-button"
        @click='toggleAddUnit'
      >Add Teacher</a>

      <!-- Teacher add form -->
      <div v-else class="field">
        <h2>Add Teacher</h2>
        <label class="label">Name</label>
        <div class="control">
          <input 
            :class="{ input : true, 'is-danger' : !form_valid }"
            v-model='unit_name'
            @input='form_valid = true'
            type="text"
            placeholder="Teacher Name"
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

    <!-- Teachers list -->
    <transition name='fade'>
      <table v-show='$store.teachers.length != 0' class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <transition-group name='slide' tag="tbody">
          <!-- check if index is deleted for deleted items -->
          <tr 
            :key="index"
            v-for='(teacher, index) in $store.teachers'
            v-if='teacher != "deleted"'
          >
            
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
                  <button @click="editing=-1;teacer_name=''" class="button is-danger custom-edit-button">Cancel</button>
                  <span v-show='!form_valid' class="help is-danger">Please enter a name</span>
                </div>
                  
                <div key='2' v-else>
                  {{ teacher.name }}
                </div>
              </transition>
            </td>
            <td 
              style="text-align: center;
              color: #6ba3ff;
              cursor: pointer;"
            >
              <router-link :to="'/teacher/' + index + '/lessons/'">
                {{ teacher.lessons.length }} 
                <!-- plural grammar -->
                <span v-if='teacher.lessons.length == 1'>Subject</span>
                <span v-else='teacher.lessons.length == 1'>Subjects</span>
              </router-link>
               
            </td>
            <td 
              style="cursor: pointer;
              text-align:center;
              font-weight: bolder;"
            >
              <!-- teacher name edit and delete buttons -->
              <span @click = 'editUnit(index, teacher.name)'>
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
import Vue from 'vue';
  export default {
    data() {
      return {
        type: 'teacher',
        association: 'lessons',

        showAddForm: false,
        unit_name: '',
        form_valid: true,
        editing: -1
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