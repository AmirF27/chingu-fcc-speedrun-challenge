<template>
    <main class="container">
        <ul v-if="ready" class="list">
            <li v-for="user in userData" class="list-item">
                <img :src="user.logo" :alt="user.displayName">
                {{ user.displayName }}
                <span class="right">
                    {{ user.online ? "Online" : "Offline" }}
                </span>
                <p v-if="user.online">
                    {{ user.stream }}
                </p>
            </li>
        </ul>
        <img v-else class="center-text" src="../assets/img/ajax-loader.gif" alt="Loading">
    </main>
</template>

<script>
import StreamService from "../stream-service";

export default {
    data() {
        return {
            users: [
                "ESL_SC2",
                "OgamingSC2",
                "cretetion",
                "freecodecamp",
                "storbeck",
                "habathcx",
                "RobotCaleb",
                "noobs2ninjas"
            ],
            userData: [],
            ready: false
        };
    },
    created() {
        this.ready = false;
        var vm = this;

        for (let user of this.users) {
            let data = {};

            StreamService.getUserData(user)
            .then(function fulfilled(user) {
                Object.assign(data, user);
                return StreamService.getStream(data.name);
            }, function rejected(reason) {
                console.error(reason);
            })
            .then(function fulfilled(stream) {
                Object.assign(data, stream);
                vm.userData.push(data);
            });
        }

        this.userData.sort(function(a, b) {
            return a.online - b.online;
        });

        this.ready = true;
    }
};
</script>
