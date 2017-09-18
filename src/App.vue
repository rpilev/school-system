<template>
  <div id="app">
    <img id='main-logo-mobile' class="navbar-item" rel='' src="./assets/logo.png">
    <h1 class="main-title">School System</h1>
    <app-nav-bar></app-nav-bar>
    <div class="section main-module">
      <div class="notification">
        <router-view></router-view>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';

export default {
  components: {
    AppNavBar: Navbar,
    AppFooter: Footer
  },
  name: 'app',
  data () {
    return {

    }
  }
}


</script>

<style lang="scss">
$desktop: 650px;
@import '../node_modules/bulma/bulma.sass';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin: 60px 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px 0 20px;
}

h1, h2 {
  font-family: 'Lora', serif;
  font-weight: bolder;
  font-size: 32px;
  text-align: left;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.main-module {
  max-width: unset;
  width: unset;
}

.button {
  margin: 10px 0;
}

table thead,  table tfoot {
  background-color: #d8ecff;
}

.custom-edit-button{
  margin: 0;
  height: 1.8em;
  padding: 0 6px;
  font-size: 14px;
  margin-top: 7px;
}

/* MOBILE SUPPORT */

.button.navbar-burger {
  margin: 0 auto;
}

#main-logo-mobile {
  display: none;
  height: 100px;
  width: auto;
  margin: 0 auto;
}

@media screen and (max-width: 750px) {
  .section.main-module {
    padding: 0px;
  }
  .notification {
    padding: 1.25rem 0.8rem 1.25rem 0.8rem;
  }
  #app {
    padding: 60px 0px 0 6px;
  }
  .main-title {
    text-align: center;
  }
  #main-logo-mobile {
    display: block;
  }
  .add-button {
    display: block;
  }
  .table-name-row {
    max-width: 93px;
    word-break: break-all;
  }

}

@media screen and (max-width: 750px) {
  #main-logo{
    display: none;
  }
}
</style>
