import Ajax from "./ajax";

const MAX_KEY = 999999;

function generateRandom(max) {
    Math.floor(Math.random() * max);
}

export default class Quote {
    constructor(text, author) {
        this.text = text;
        this.author = author || "Unknown author";
    }

    static getQuote(context, cb) {
        let url = "http://api.forismatic.com/api/1.0/",
            params = {
                method: "getQuote",
                key: generateRandom(MAX_KEY),
                format: "jsonp",
                lang: "en",
                jsonp: "?"
            };
        
        $.getJSON(Ajax.resolveUrl(url, params), function(response) {
            cb.call(context, new Quote(response.quoteText, response.quoteAuthor));
        });

        // at first was going to use the utility below that I wrote myself for the
        // HTTP request, but due to CORS issues I had to use JSONP, thus decided
        // to use jQuery's getJSON to achieve this.
        // left it as a comment for future reference.

        // Ajax.get(url, params).then(
        //     function fulfilled(response) {
        //         response = JSON.parse(response);
        //         // call the callback with the context passed in and the quote
        //         cb.call(context, new Quote(response.quoteText, response.quoteAuthor));
        //     },
        //     function rejected(reason) {
        //         console.error(reason);
        //     });
    }
};
