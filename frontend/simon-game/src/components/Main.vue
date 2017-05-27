<template>
    <main class="container">
        <div class="simon">
            <div @click="check('green', $event)" class="color-btn green"></div>
            <div @click="check('red', $event)" class="color-btn red"></div>
            <div @click="check('yellow', $event)" class="color-btn yellow"></div>
            <div @click="check('blue', $event)" class="color-btn blue"></div>
            <div class="interface center-text">
                <h2>Simon</h2>
                <div class="interface-row">
                    <p class="display">
                        <template v-if="simon.on">
                            {{ simon.pattern.length }}
                        </template>
                    </p>
                    <button class="simon-btn simon-btn--start" @click="start">
                        <label>Start</label>
                    </button>
                </div>
                <div class="interface-row">
                    <button class="simon-btn simon-btn--toggle" @click="simon.on = !simon.on">
                        <label>Power</label>
                        <span class="indicator indicator--on">On</span>
                        <span class="indicator indicator--off">Off</span>
                        <span class="switch" :class="{ 'switch--on': simon.on }"></span>
                    </button>
                    <button class="simon-btn simon-btn--toggle" @click="simon.strict = !simon.strict">
                        <label>Strict</label>
                        <span class="indicator indicator--on">On</span>
                        <span class="indicator indicator--off">Off</span>
                        <span class="switch" :class="{ 'switch--on': simon.strict }"></span>
                    </button>
                </div>
            </div>
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
