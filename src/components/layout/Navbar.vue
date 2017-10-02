<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <img id='main-logo' class="navbar-item" rel='' :src="logoSource">
        <button @click='navbar_open = !navbar_open' :class="{ 'button' : true, 'navbar-burger' : true, 'is-active' : navbar_open }" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <transition name='slide'>
        <div v-if='navbar_open || windowWidth > 650' :class="{ 'navbar-menu' : true, 'is-active' : navbar_open }" id="navMenu">
          <div class="navbar-start" @click='navbar_open = false'>
            <router-link to="/" class="navbar-item"  active-class="active" exact>
              Stats
            </router-link>
            <router-link to="/teachers" class="navbar-item"  active-class="active">
              Teachers
            </router-link>
            <router-link to="/students" class="navbar-item"  active-class="active">
              Students
            </router-link>
            <router-link to="/subjects" class="navbar-item"  active-class="active">
              Subjects
            </router-link>
            <router-link to="/grades" class="navbar-item"  active-class="active">
              Grades
            </router-link>
            <router-link to="/import-export" class="navbar-item"  active-class="active">
              Import / Export
            </router-link>
          </div>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navbar_open: false,
        logoSource: require('../../assets/img/logo.png'),
        
        windowWidth: 0
      }
    },
    mounted() {
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);
        //Init
        this.getWindowWidth()
      })
    },
    methods: {
      getWindowWidth(event) {
          this.windowWidth = document.documentElement.clientWidth;
      },
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
    }
  }

</script>

<style scoped>
  nav {
    margin-bottom: 5px;
  }
  #main-logo {
    height: 50px;
    width: auto;
  }
  .active {
    background-color: whitesmoke;
    color: #0a0a0a;
  }
  .navbar-item {
    text-align: center;
    font-size: 20px;
  }
</style>