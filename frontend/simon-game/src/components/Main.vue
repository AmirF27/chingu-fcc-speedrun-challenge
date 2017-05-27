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
                            <template v-if="!gameWon">
                                {{ simon.pattern.length }}
                            </template>
                            <template v-else>
                                <i class="fa fa-trophy" aria-hidden="true"></i>
                            </template>
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
            colors: ["green", "red", "yellow", "blue"],
            simon: new Simon(),
            playing: false,
            gameWon: false
        };
    },
    methods: {
        start() {
            this.simon.start();
            this.play();
        },
        check(color, event) {
            if (this.simon.started && !this.playing && !this.gameWon) {
                this.lighten(event.target);
                this.simon.playSoundByColor(color);

                if (this.simon.check(color)) {
                    if (this.simon.pattern.length - 1 >= 20) {
                        this.playWinningPattern();
                    }
                    else {
                        this.play();
                    }
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
                    let currentBtn = document.querySelector(
                        `.${current.value.color}`
                    );
                    this.lighten(currentBtn, this.speed / 2);
                    current.value.sound.play();

                    console.log(this.speed);
                }
            }, this.speed);
        },
        lighten(btn, interval = 500) {
            btn.classList.add("current");

            setTimeout(function() {
                btn.classList.remove("current");
            }, interval);
        },
        playWinningPattern() {
            const TIMES = 5;
            var index = 0,
                colors = ["green", "red", "blue", "yellow"];

            this.gameWon = true;

            var interval = setInterval(() => {
                let btn = document.querySelector(
                    `.${colors[index % colors.length]}`
                );

                this.lighten(btn, 200);

                if (++index >= this.colors.length * TIMES) {
                    this.gameWon = false;
                    this.start();
                    clearInterval(interval);
                }
            }, 150);
        }
    },
    computed: {
        speed() {
            if (this.simon.pattern.length < 5) {
                return 1000;
            }
            else if (this.simon.pattern.length < 9) {
                return 800;
            }
            else if (this.simon.pattern.length < 13) {
                return 600;
            }
            else {
                return 400;
            }
        }
    }
};
</script>
