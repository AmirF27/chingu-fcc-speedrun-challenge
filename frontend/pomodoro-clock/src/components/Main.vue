<template>
    <main class="container">
        <div class="pomodoro center-text">
            <div class="options">
                <div class="left">
                    <p>Session Length</p>
                    <div class="spinner">
                        <button @click="pomodoro.sessionTime--" class="btn btn--default">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </button>
                        <span class="number">{{ pomodoro.sessionTime }}</span>
                        <button @click="pomodoro.sessionTime++" class="btn btn--default">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div class="right">
                    <p>Break Length</p>
                    <div class="spinner">
                        <button @click="pomodoro.breakTime--" class="btn btn--default">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </button>
                        <span class="number">{{ pomodoro.breakTime }}</span>
                        <button @click="pomodoro.breakTime++" class="btn btn--default">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="timer">
                <p class="session">{{ pomodoro.current }}</p>
                <p class="time">{{ pomodoro.minutes }}:{{ pomodoro.formatSeconds() }}</p>
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
        </div>
    </main>
</template>

<script>
"use strict";

import Pomodoro from "../pomodoro";

const SESSION_TIME = 25,
      BREAK_TIME = 5;

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
