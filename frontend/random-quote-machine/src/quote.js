export default class Quote {
    constructor(text, author) {
        this.text = text;
        this.author = author
    }

    static getQuote() {
        return new Quote("Random quote", "Author");
    }
};
