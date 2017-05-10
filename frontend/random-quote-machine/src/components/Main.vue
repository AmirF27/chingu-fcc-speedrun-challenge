<template>
    <main class="container">
        <div class="box">
            <i class="fa fa-quote-left quote-icon" aria-hidden="true"></i>
            <blockquote class="quote">{{ quote.text }}</blockquote>
            <span class="author right">&ndash; {{ quote.author }}</span>
            <button v-on:click="showQuote" class="btn btn--default btn--new-quote">
                New quote
            </button>
            <a v-bind:href="tweetUrl" class="btn btn--default btn--tweet center-text" target="_blank">
                <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
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
            Quote.getQuote(this, function(quote) {
                ({
                    text: this.quote.text,
                    author: this.quote.author
                } = quote);
            });
        }
    },
    computed: {
        tweetUrl() {
            let tweetText = encodeURIComponent(`${this.quote.text} - ${this.quote.author}`);
            return `https://twitter.com/intent/tweet?text=${tweetText}`;
        }
    },
    created() {
        this.showQuote();
    }
};
</script>
