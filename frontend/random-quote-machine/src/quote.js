import Ajax from "./ajax";

const MAX_KEY = 999999;

function generateRandom(max) {
    Math.floor(Math.random() * max);
}

export default class Quote {
    constructor(text, author) {
        this.text = text;
        this.author = author
    }

    static getQuote(context, cb) {
        let url = "http://api.forismatic.com/api/1.0/",
            params = {
                method: "getQuote",
                key: generateRandom(MAX_KEY),
                format: "xml",
                lang: "en"
            },
            quote;

        Ajax.get(url, params).then(
            function fulfilled(response) {
                console.error(response);
                // call the callback with the context passed in and the quote
                cb.call(context, new Quote(response.quoteText, response.quoteAuthor));
            },
            function rejected(reason) {
                console.error(reason);
            });

        return quote;
    }
};
