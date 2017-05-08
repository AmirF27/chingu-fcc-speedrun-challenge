<template>
  <div id="app">
      <app-header></app-header>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
    name: "app",
    components: {
        "app-header": Header
    }
};
</script>

<style>
@import "assets/scss/style.scss";
</style>
