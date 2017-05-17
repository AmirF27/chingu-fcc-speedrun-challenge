<template>
    <main class="container">
        <button @click="start" class="btn btn--default">Start Clock</button>
        <div class="">
            {{ pomodoro.minutes }}:{{ pomodoro.seconds }}
        </div>
    </main>
</template>

<script>
"use strict";

import Pomodoro from "../pomodoro";

const WORK_TIME = 2,
      BREAK_TIME = 1;

export default {
    data() {
        return {
            pomodoro: new Pomodoro(WORK_TIME, BREAK_TIME),
            minutes: 2,
            seconds: 0,
            started: false
        };
    },
    methods: {
        start() {
            this.pomodoro.start();
        }
    }
};
</script>
