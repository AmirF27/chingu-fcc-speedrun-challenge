<template>
    <main class="container">
        <div class="simon">
            <div @click="check('green')" class="simon-btn green"></div>
            <div @click="check('red')" class="simon-btn red"></div>
            <div @click="check('yellow')" class="simon-btn yellow"></div>
            <div @click="check('blue')" class="simon-btn blue"></div>
            <button class="btn btn--default" @click="start">
                Start
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
            simon: new Simon()
        };
    },
    methods: {
        start() {
            this.simon.start();
            this.play();
        },
        check(color) {
            if (this.simon.check(color)) {
                this.play();
            }
        },
        play() {
            var pattern = this.simon.playPattern();

            var interval = setInterval(() => {
                var current = pattern.next();

                if (current.done) {
                    clearInterval(interval);
                }
                else {
                    console.log(current.value);
                }
            }, 500);
        }
    }
};
</script>
