<template>
    <main class="container center-text">
        <div class="container">
            <div class="left">
                <p>Session Length</p>
                <button @click="pomodoro.sessionTime--" class="btn btn--default">
                    <i class="fa fa-minus" aria-hidden="true"></i>
                </button>
                <span>{{ pomodoro.sessionTime }}</span>
                <button @click="pomodoro.sessionTime++" class="btn btn--default">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </div>
            <div class="right">
                <p>Break Length</p>
                <button @click="pomodoro.breakTime--" class="btn btn--default">
                    <i class="fa fa-minus" aria-hidden="true"></i>
                </button>
                <span>{{ pomodoro.breakTime }}</span>
                <button @click="pomodoro.breakTime++" class="btn btn--default">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div class="timer">
            <p>{{ pomodoro.current }}</p>
            <p>{{ pomodoro.minutes }}:{{ pomodoro.formatSeconds() }}</p>
        </div>
        <div class="btn-group">
            <button @click="start" class="btn btn--primary">
                <i class="fa fa-play" aria-hidden="true"></i>
            </button>
            <button @click="pause" class="btn btn--default">
                <i class="fa fa-pause" aria-hidden="true"></i>
            </button>
            <button @click="stop" class="btn btn--negative">
                <i class="fa fa-stop" aria-hidden="true"></i>
            </button>
        </div>
    </main>
</template>

<script>
"use strict";

import Pomodoro from "../pomodoro";

const SESSION_TIME = 2,
      BREAK_TIME = 1;

export default {
    data() {
        return {
            pomodoro: new Pomodoro(SESSION_TIME, BREAK_TIME)
        };
    },
    methods: {
        start() {
            this.pomodoro.start();
        },
        stop() {
            this.pomodoro.stop();
        },
        pause() {
            this.pomodoro.pause();
        }
    }
};
</script>
