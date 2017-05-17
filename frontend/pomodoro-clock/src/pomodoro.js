"use strict";

const STARTING_SECONDS = 59;

var inProgress = Symbol();
var paused = Symbol();
var timer = Symbol();

export default class Pomodoro {
    constructor(sessionTime = 25, breakTime = 5) {
        this._sessionTime = sessionTime;
        this._breakTime = breakTime;
        this.seconds = 0;
        this.minutes = sessionTime;
        this.current = "session";
        this.sounds = {
            "session": new Howl({
                src: require("./assets/audio/and-a-happy-new-year-sms.mp3")
            }),
            "break": new Howl({
                src: require("./assets/audio/jingle-bells-sms.mp3")
            })
        };
        this[inProgress] = false;
        this[timer] = undefined;
    }

    set sessionTime(value) {
        if (!this[inProgress] && (value >= 1 && value <= 120)) {
            this._sessionTime = value;
            this.minutes = value;
        }
    }

    get sessionTime() {
        return this._sessionTime;
    }

    set breakTime(value) {
        if (!this[inProgress] && (value >= 1 && value <= 120)) {
            this._breakTime = value;
        }
    }

    get breakTime() {
        return this._breakTime;
    }

    start() {
        if (this[paused]) {
            this[paused] = false;
        }
        else if (!this[inProgress]) {
            this[inProgress] = true;
            this.startTimer("session");
        }
    }

    startTimer(type) {
        if (type == "session" || type == "break") {
            this.seconds = STARTING_SECONDS;
            this.minutes = type == "session" ? this.sessionTime - 1 : this.breakTime - 1;
            this.current = type;
            this.sounds[type].play();
            clearInterval(this[timer]);
            this[timer] = setInterval(() => {
                if (!this[paused] && --this.seconds <= 0) {
                    this.seconds = STARTING_SECONDS;
                    if (this.minutes-- <= 0) {
                        if (type == "session") {
                            this.startTimer("break");
                        }
                        else {
                            this.startTimer("session");
                        }
                    }
                }
            }, 1000);
        }
        else {
            throw new Error(`${type} is an invalid session type`);
        }
    }

    stop() {
        clearInterval(this[timer]);
        this.minutes = this.sessionTime;
        this.seconds = 0;
        this.current = "session";
        this[inProgress] = false;
        this[paused] = false;
    }

    pause() {
        if (this[inProgress]) {
            this[paused] = true;
        }
    }

    formatSeconds() {
        return this.seconds < 10 ? "0" + this.seconds : this.seconds.toString();
    }
}
