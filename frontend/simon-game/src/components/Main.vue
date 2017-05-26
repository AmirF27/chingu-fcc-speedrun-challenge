<template>
    <main class="container">
        <div class="simon">
            <div @click="check('green', $event)" class="simon-btn green"></div>
            <div @click="check('red', $event)" class="simon-btn red"></div>
            <div @click="check('yellow', $event)" class="simon-btn yellow"></div>
            <div @click="check('blue', $event)" class="simon-btn blue"></div>
            <button class="btn btn--default" @click="simon.on = !simon.on">
                On/Off
            </button>
            <button class="btn btn--default" @click="start">
                Start
            </button>
            <button class="btn btn--default" @click="simon.strict = !simon.strict">
                Strict {{ simon.strict }}
            </button>
            <span>Steps: {{ simon.pattern.length }}</span>
        </div>
    </main>
</template>

<script>
"use strict";

import Simon from "../simon";

export default {
    data() {
        return {
            simon: new Simon(),
            playing: false
        };
    },
    methods: {
        start() {
            this.simon.start();
            this.play();
        },
        check(color, event) {
            if (this.simon.on && this.simon.started && !this.playing) {
                this.lighten(event.target);

                if (this.simon.check(color)) {
                    this.play();
                }
            }
        },
        play() {
            var pattern = this.simon.playPattern();

            this.playing = true;

            var interval = setInterval(() => {
                var current = pattern.next();

                if (current.done) {
                    this.playing = false;
                    clearInterval(interval);
                }
                else {
                    let currentBtn = document.querySelector(`.${current.value}`);
                    this.lighten(currentBtn)
                }
            }, 1000);
        },
        lighten(btn) {
            btn.classList.add("current");

            setTimeout(function() {
                btn.classList.remove("current");
            }, 500);
        }
    }
};
</script>
