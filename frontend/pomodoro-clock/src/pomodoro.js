const STARTING_SECONDS = 59;

var started = Symbol();
var timer = Symbol();

export default class Pomodoro {
    constructor(workTime = 25, breakTime = 5) {
        this.workTime = workTime;
        this.breakTime = breakTime;
        this.seconds = 0;
        this.minutes = workTime;
        this.current = "none";
        this[started] = false;
        this[timer] = undefined;
    }

    start() {
        if (!this[started]) {
            this[started] = true;
            this.startTimer("work");
        }
    }

    startTimer(type) {
        this.seconds = STARTING_SECONDS;
        this.minutes = type == "work" ? this.workTime - 1 : this.breakTime - 1;
        this.current = type;
        clearInterval(this[timer]);
        this[timer] = setInterval(() => {
            if (--this.seconds <= 0) {
                this.seconds = STARTING_SECONDS;
                if (this.minutes-- <= 0) {
                    if (type == "work") {
                        this.startTimer("break");
                    }
                    else {
                        this.stop();
                    }
                }
            }
        }, 1000);
    }

    stop() {
        clearInterval(this[timer]);
        this.minutes = this.workTime;
        this.seconds = 0;
        this[started] = false;
    }
}
