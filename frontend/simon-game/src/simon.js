var colors = Symbol();
var moveCount = Symbol();

export default class Simon {
    constructor() {
        this.pattern = [];
        this[colors] = ["green", "red", "yellow", "blue"];
        this.started = false;
        this[moveCount] = 0;
    }

    start() {
        if (!this.started) {
            this.started = true;
        }
        else {
            this.reset();
        }

        this.addToPattern();
    }

    reset() {
        this.pattern = [];
        this[moveCount] = 0;
    }

    addToPattern() {
        this.pattern.push(this.randomColor());
        console.log(this.pattern);
    }

    randomColor() {
        return this[colors][Math.floor(Math.random() * this[colors].length)];
    }

    check(color) {
        if (color != this.pattern[this[moveCount]]) {
            this[moveCount] = 0;
        }
        else if (++this[moveCount] == this.pattern.length) {
            this[moveCount] = 0;
            this.addToPattern();
        }
    }
}
