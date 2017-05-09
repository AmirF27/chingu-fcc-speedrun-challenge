<template>
    <div id="app">
        <app-header v-bind:projectTitle="projectTitle"></app-header>
        <app-main></app-main>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";

const PROJECT_TITLE = "Random Quote Machine";

export default {
    name: "app",
    components: {
        "app-header": Header,
        "app-main": Main,
        "app-footer": Footer
    },
    data() {
        return {
            projectTitle: PROJECT_TITLE
        };
    }
};
</script>

<style>
@import "./assets/scss/style.scss";
</style>
