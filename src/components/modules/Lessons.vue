<template>
  <div>
    <transition name='fade' mode='out-in'>
      <a 
        v-if='!showAddForm'
        class="button is-info add-button"
        @click='toggleAddUnit'
      >Add Subject</a>

      <!-- Lesson add form -->
      <div v-else class="field">
        <h2>Add Subject</h2>
        <label class="label">Name</label>
        <div class="control">
          <input 
            :class="{ input : true, 'is-danger' : !form_valid }"
            v-model='unit_name'
            @input='form_valid = true'
            type="text"
            placeholder="Subject Name"
          >
        </div>
        <p v-show='!form_valid' class="help is-danger">Please enter a name</p>
        <br>
        <div class="control">
          <button 
            @click='addUnit()'
            class="button is-primary"
          >
          Submit</button>
          <button 
            @click='showAddForm = false;
                    unit_name ="";
                    form_valid = true;'
            class="button is-danger"
          >
          Cancel</button>
        </div>
      </div>
    </transition>

    <!-- Lessons list -->
    <transition name='fade'>
      <table v-show='$store.lessons.length != 0' class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Students</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <transition-group name='slide' tag="tbody">
          <!-- check if index for deleted items -->
          <tr
            :key="index"
            v-for='(lesson, index) in $store.lessons'
            v-if='lesson != "deleted"'>
            
            
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
                  {{ lesson.name }}
                </div>
              </transition>
            </td>
            <td 
              style="text-align: center;
              color: #6ba3ff;
              cursor: pointer;"
            >
              <router-link :to="'/lesson/' + index + '/students/'">
                {{  lesson.students.length }}
                <!-- plural grammar -->
                <span v-if='lesson.students.length == 1'>Student</span>
                <span v-else='lesson.students.length == 1'>Students</span>
              </router-link>
            </td>
            <td 
              style="cursor: pointer;
              text-align:center;
              font-weight: bolder;"
            >
              <!-- lesson name edit and delete buttons -->
              <span @click = 'editUnit(index, lesson.name)'>
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
        type: 'lesson',
        association: 'teachers',

        showAddForm: false,
        unit_name: '',
        form_valid: true,
        editing: -1
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