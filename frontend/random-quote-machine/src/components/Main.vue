<template>
    <main>
        <div class="box">
            <blockquote>{{ quote.text }}</blockquote>
            <span class="author">&ndash; {{ quote.author }}</span>
        </div>
    </main>
</template>

<script>
import Quote from "../quote";

export default {
    data() {
        return {
            quote: {
                text: "",
                author: ""
            }
        };
    },
    methods: {
        showQuote() {
            ({
                text: this.quote.text,
                author: this.quote.author
            } = Quote.getQuote());
        }
    },
    created() {
        this.showQuote();
    }
};
</script>

<style>
</style>
