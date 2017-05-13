<template>
    <main class="container">
        <div class="center-text">
            <button @click="showAll" class="btn btn--default">All</button>
            <button @click="showOnline" class="btn btn--default">Online</button>
            <button @click="showOffline" class="btn btn--default">Offline</button>
        </div>
        <ul v-if="ready" class="list">
            <li v-for="user in displayedUsers" class="list-item">
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
        <div v-else class="center-text">
            <img src="../assets/img/ajax-loader.gif" alt="Loading">
        </div>
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
            displayedUsers: [],
            ready: false
        };
    },
    methods: {
        showAll() {
            this.displayedUsers = this.userData.slice();
        },
        showOnline() {
            this.displayedUsers = this.userData.filter(user => user.online);
        },
        showOffline() {
            this.displayedUsers = this.userData.filter(user => !user.online);
        }
    },
    created() {
        this.ready = false;
        var vm = this,
            requestsDone = 0;

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
                // check if we're done getting the data
                if (++requestsDone === vm.users.length) {
                    vm.ready = true;
                    vm.userData.sort((a, b) => b.online - a.online);
                    vm.showAll();
                }
            });
        }
    }
};
</script>
