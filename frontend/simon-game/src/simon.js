"use strict";

var buttons = Symbol();
var moveCount = Symbol();

export default class Simon {
    constructor() {
        this.pattern = [];
        this[buttons] = [
            {
                color: "green",
                sound: new Howl({
                    src: require("./assets/audio/simonSound1.mp3")
                })
            },
            {
                color: "red",
                sound: new Howl({
                    src: require("./assets/audio/simonSound2.mp3")
                })
            },
            {
                color: "yellow",
                sound: new Howl({
                    src: require("./assets/audio/simonSound3.mp3")
                })
            },
            {
                color: "blue",
                sound: new Howl({
                    src: require("./assets/audio/simonSound4.mp3")
                })
            }
        ];
        this._on = false;
        this.started = false;
        this[moveCount] = 0;
        this.strict = false;
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
        this.pattern.push(this.randomButton());
    }

    randomButton() {
        var index = Math.floor(Math.random() * this[buttons].length);

        return this[buttons][index];
    }

    check(color) {
        if (color != this.pattern[this[moveCount]].color) {
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

    playSoundByColor(color) {
        for (let button of this[buttons]) {
            if (color == button.color) {
                button.sound.play();
                return;
            }
        }
    }

    get on() {
        return this._on;
    }

    set on(value){
        this._on = value;

        if (!value) {
            this.started = false;
        }

        this.reset();
    }
}
