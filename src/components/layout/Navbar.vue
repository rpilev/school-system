<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <img id='main-logo' class="navbar-item" rel='' src="../../assets/logo.png">

        <button class="button navbar-burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item"  active-class="active" exact>
            Stats
          </router-link>
          <router-link to="/teachers" class="navbar-item"  active-class="active">
            Teachers
          </router-link>
          <router-link to="/students" class="navbar-item"  active-class="active">
            Students
          </router-link>
          <router-link to="/lessons" class="navbar-item"  active-class="active">
            Lessons
          </router-link>
          <router-link to="/grades" class="navbar-item"  active-class="active">
            Grades
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

  /*************************************
  JS to make the Bulma navbar responsive
  *************************************/

  document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});
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
</style>