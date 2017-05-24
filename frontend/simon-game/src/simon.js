var colors = Symbol();
var moveCount = Symbol();

export default class Simon {
    constructor() {
        this.pattern = [];
        this[colors] = ["green", "red", "yellow", "blue"];
        this.started = false;
        this[moveCount] = 0;
        this.strict = false;
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

    playPattern() {
        return (function*(pattern) {
            var current = 0;

            while (current < pattern.length) {
                yield pattern[current++];
            }
        })(this.pattern);
    }

    reset() {
        this.pattern = [];
        this[moveCount] = 0;
    }

    addToPattern() {
        this.pattern.push(this.randomColor());
    }

    randomColor() {
        return this[colors][Math.floor(Math.random() * this[colors].length)];
    }

    check(color) {
        if (color != this.pattern[this[moveCount]]) {
            if (this.strict) {
                this.reset();
                this.addToPattern();
            }
            else {
                this[moveCount] = 0;
            }

            return true;
        }
        else if (++this[moveCount] == this.pattern.length) {
            this[moveCount] = 0;
            this.addToPattern();

            return true;
        }

        return false;
    }
}
