<template>
  <div id="app">
    <img id='main-logo-mobile' class="navbar-item" rel='' :src="logoSource">
    <h1 class="main-title">School System</h1>
    <app-nav-bar></app-nav-bar>
    <div class="section main-module">
      <div class="notification">
        <transition name='fade' mode='out-in'>
          <router-view></router-view>
        </transition>
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
      logoSource: require('./assets/img/logo.png'),
    }
  }
}


</script>

<style lang="scss">

@import './assets/style/global.scss';

</style>
