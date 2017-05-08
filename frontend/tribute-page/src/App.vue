<template>
  <div id="app">
      <app-header></app-header>
      <app-main></app-main>
      <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "app",
    components: {
        "app-header": Header,
        "app-main": Main,
        "app-footer": Footer
    }
};
</script>

<style>
@import "assets/scss/style.scss";
</style>
