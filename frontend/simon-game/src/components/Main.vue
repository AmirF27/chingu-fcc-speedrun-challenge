<template>
    <main class="container">
        <div class="simon">
            <div @click="simon.check('green')" class="simon-btn green"></div>
            <div @click="simon.check('red')" class="simon-btn red"></div>
            <div @click="simon.check('yellow')" class="simon-btn yellow"></div>
            <div @click="simon.check('blue')" class="simon-btn blue"></div>
            <button class="btn btn--default" @click="simon.start()">
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
    }
};
</script>
