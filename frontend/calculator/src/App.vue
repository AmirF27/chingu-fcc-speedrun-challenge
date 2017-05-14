<template>
    <div id="app">
        <app-header :projectTitle="projectTitle"></app-header>
        <app-footer :cert="cert" :project="project"></app-footer>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const PROJECT_TITLE = "JavaScript Calculator";
const CERT = "frontend";
const PROJECT = "calculator";

export default {
  name: "app",
  components: {
      "app-header": Header,
      "app-footer": Footer,
  },
  data() {
      return {
          projectTitle: PROJECT_TITLE,
          cert: CERT,
          project: PROJECT
      };
  }
};
</script>

<style>
@import "./assets/scss/style.scss";
</style>
