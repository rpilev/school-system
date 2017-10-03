import Vue from 'vue';

export default {
  methods: {
    // Toggels the adding form for a given unit
    toggleAddUnit() {
      // Stop editing and reset the unit_name and form_valid props just in case editing in progress
      this.editing = -1;
      this.unit_name = '';
      this.form_valid = true;

      this.showAddForm = true;
    },
    // Pushes a new unit into the store
    addUnit() {

      //validate form
      if(this.unit_name=='') {
        this.form_valid = false;
        return;
      }

      // Construct a new unit
      let new_unit = { 
        name: this.unit_name
      }
      // if this unit is associated with
      // other units then include an empty
      // array of them in to the object
      new_unit[this.association] = [];

      // Generate a unique id
      let id = this.$store.data.last_insert_ids[this.type] + 1;
      this.$store.data.last_insert_ids[this.type] = id;

      // Add to store
      // the type name has to be plural for the store
      Vue.set(this.$store.data[this.type + 's'], id, new_unit);

      //Reset fields and close the form
      this.unit_name = '';
      this.showAddForm = false
      this.form_valid = true;
    },

    // Removes the unit and its associations
    // from the store
    removeUnit(index) {
      // Contain these in vars with let
      // for use in ananymous functions
      let type = this.type
      let association_cleanup_refernce = this.association_cleanup_refernce

      // Reset editing just in case it is
      // in progress 
      this.editing = -1;
      this.unit_name = '';

      // Remove associations to other units
      // if they exist
      // The association_cleanup_refernce points to
      // other units that could be associted with this 
      // object
      if(association_cleanup_refernce){
        for (var key in this.$store.data[association_cleanup_refernce]) {

          if (!this.$store.data[association_cleanup_refernce].hasOwnProperty(key)) continue;
          
          if(this.$store.data[association_cleanup_refernce][key][type + 's'].indexOf(parseInt(index)) > -1){

            let index_to_remove = this.$store.data[association_cleanup_refernce][key][type + 's'].indexOf(parseInt(index));
            this.$store.data[association_cleanup_refernce][key][type + 's'].splice(index_to_remove, 1);
          }
        }
      }
      
      if(confirm('Deleting this permanently. Continue?')){

        Vue.delete(this.$store.data[type + 's'], index);

      }else{
        return;
      }
    },

    // Shows, validates and hides the edit input
    editUnit(index, lesson) {
      // Hide the add lesson form just in case its open
      this.showAddForm = false;

      //reset form_valid prop
      this.form_valid = true;

      this.editing = index;
      this.unit_name = lesson;
    },

    // Carries out a submitted edit
    submitEdit(index) {
      //validate
      if(this.unit_name == ''){
        this.form_valid = false;
        return;
      }
      //get the current unit
      let current_unit = this.$store.data[this.type + 's'][index];
      //replace the name prop
      current_unit.name = this.unit_name;
      //replace the old lesson obj in the store prop
      this.$store.data[this.type + 's'][index] = current_unit;
      //stop editing
      this.editing = -1;
    }
  }
}