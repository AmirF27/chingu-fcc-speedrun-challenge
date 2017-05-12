<template>
    <main class="container"></main>
</template>

<script>
import StreamService from "../stream-service";

export default {
    created() {
        StreamService.getUserData("freecodecamp")
        .then(function fulfilled(user) {
            console.log(user);
            return StreamService.getStreams("ESL_SC2");
        }, function rejected(reason) {
            console.error(reason);
        })
        .then(function fulfilled(streams) {
            console.log(streams);
        });
    }
};
</script>
