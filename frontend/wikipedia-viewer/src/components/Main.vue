<template>
    <main class="container">
        <ul v-if="done">
            <li v-for="article in articles">
                <h2>{{ article.title }}</h2>
                <p>{{ article.snippet }}</p>
            </li>
        </ul>
        <div v-else class="center-text">
            <img src="../assets/img/ajax-loader.gif" alt="Loading">
        </div>
    </main>
</template>

<script>
import Viewer from "../viewer";

export default {
    data() {
        return {
            articles: [],
            done: false
        };
    },
    created() {
        this.done = false;
        let vm = this;

        Viewer.getArticles("video game").then(
            function fulfilled(articles) {
                for (let article of articles) {
                    vm.articles.push(article);
                }
                vm.done = true;
            },
            function rejected(reason) {
                console.error(reason);
            });
    }
};
</script>
