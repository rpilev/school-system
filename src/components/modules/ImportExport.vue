<template>
  <div>
    <transition name='fade' mode='out-in'>
      <div v-if='!dataImported'>
        <h2>Export Data</h2>
        <button class="button is-primary" @click="exportData">Dowload</button>
        <a id="downloadAnchorElem" style="display:none"></a>

        <h2>Import Data</h2>
        <input type="file" id="selectFiles" value="Import" /><br />
        <button @click="importData" class="button is-info" id="import">Import</button> 
      </div>
      <h2 v-else style="color:green">Data imported.</h2>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataImported: false
      }
    },
    methods: {
      exportData () {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.$store.data));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", "school-system-data.json");
        dlAnchorElem.click();
      },
      importData() {
        var files = document.getElementById('selectFiles').files;

        if (files.length <= 0) {
          return false;
        }

        var fr = new FileReader();

        self = this;

        fr.onload = function(e) { 
          var result = JSON.parse(e.target.result);

          self.$store.data = result;
          self.dataImported = true;
        }

        fr.readAsText(files.item(0));
      }
    }
  }
</script>

<style>
  
</style>