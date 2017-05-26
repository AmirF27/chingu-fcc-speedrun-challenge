var colors = Symbol();
var moveCount = Symbol();

export default class Simon {
    constructor() {
        this.pattern = [];
        this[colors] = ["green", "red", "yellow", "blue"];
        this._on = false;
        this.started = false;
        this[moveCount] = 0;
        this._strict = false;
    }

    start() {
        if (this.on) {
            if (!this.started) {
                this.started = true;
            }
            else {
                this.reset();
            }

            this.addToPattern();
        }
    }

    *playPattern() {
        var current = 0;

        while (current < this.pattern.length) {
            yield this.pattern[current++];
        }
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

    get on() {
        return this._on;
    }

    set on(value){
        this._on = value;

        if (!value) {
            this._strict = false;
        }
    }

    get strict() {
        return this._strict;
    }

    set strict(value) {
        if (this.on) {
            this._strict = value;
        }
    }
}
