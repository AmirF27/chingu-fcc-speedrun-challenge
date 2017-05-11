<template>
    <main class="container">
        <div class="center-text">
            <input @keyup.enter="search" v-model="searchTerm" type="text" placeholder="">
            <button @click="search" class="btn btn--default">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
            <a class="btn btn--default" href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">
                Random Article
            </a>
        </div>
        <ul v-if="!pending && articles.length > 0">
            <li v-for="article in articles">
                <h2>{{ article.title }}</h2>
                <p>{{ article.snippet }}</p>
            </li>
        </ul>
        <div v-else-if="pending" class="center-text loading">
            <img src="../assets/img/ajax-loader.gif" alt="Loading">
        </div>
        <p v-if="noResults" class="center-text">
            Sorry, your search matched no results.
        </p>
    </main>
</template>

<script>
import Viewer from "../viewer";

export default {
    data() {
        return {
            searchTerm: "",
            articles: [],
            pending: false,
            noResults: false
        };
    },
    methods: {
        search() {
            this.pending = true;
            this.noResults = false;
            this.articles = [];

            let vm = this;

            Viewer.getArticles(vm.searchTerm).then(
                function fulfilled(articles) {
                    if (articles.length > 0) {
                        for (let article of articles) {
                            vm.articles.push(article);
                        }
                    }
                    else {
                        vm.noResults = true;
                    }

                    vm.pending = false;
                },
                function rejected(reason) {
                    console.error(reason);
                });
        }
    }
};
</script>
