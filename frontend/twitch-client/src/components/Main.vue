<template>
    <main class="container">
        <div class="btn-group center-text">
            <button @click="showAll" class="btn" :class="showing == 'all' ? 'btn--primary' : 'btn--default'">
                All
            </button>
            <button @click="showOnline" class="btn" :class="showing == 'online' ? 'btn--primary' : 'btn--default'">
                Online
            </button>
            <button @click="showOffline" class="btn btn--default" :class="showing == 'offline' ? 'btn--primary' : 'btn--default'">
                Offline
            </button>
        </div>
        <ul v-if="ready" class="list">
            <li v-for="user in displayedUsers" class="list-item">
                <div class="user-logo center-text">
                    <img class="responsive-img" :src="user.logo" :alt="user.displayName">
                    <p>
                        <i class="fa fa-circle" aria-hidden="true"
                           :class="user.online ? 'online' : 'offline'">
                       </i>
                        {{ user.found ? user.online ? "Online" : "Offline" : "Not Found" }}
                    </p>
                </div>
                <div class="user-info">
                    <a v-if="user.found" :href="'https://www.twitch.tv/' + user.name" target="_blank">
                        <h3>{{ user.displayName }}</h3>
                    </a>
                    <h3 v-else>{{ user.displayName }}</h3>
                    <p v-if="user.online">
                        {{ user.stream }}
                    </p>
                </div>
            </li>
        </ul>
        <div v-else class="loading center-text">
            <img src="../assets/img/ajax-loader.gif" alt="Loading">
        </div>
    </main>
</template>

<script>
import StreamService from "../stream-service";

export default {
    data() {
        return {
            usernames: [
                "ESL_SC2",
                "OgamingSC2",
                "cretetion",
                "freecodecamp",
                "storbeck",
                "habathcx",
                "RobotCaleb",
                "noobs2ninjas",
                "brunofin",
                "comster404"
            ],
            userData: [],
            displayedUsers: [],
            ready: false,
            showing: "all"
        };
    },
    methods: {
        showAll() {
            this.displayedUsers = this.userData.slice();
            this.showing = "all";
        },
        showOnline() {
            this.displayedUsers = this.userData.filter(user => user.online);
            this.showing = "online";
        },
        showOffline() {
            this.displayedUsers = this.userData.filter(user => !user.online);
            this.showing = "offline";
        }
    },
    created() {
        this.ready = false;

        var userRequests = [],
            streamRequests = [];

        for (let username of this.usernames) {
            userRequests.push(StreamService.getUserData(username));
        }

        Promise.all(userRequests).then(users => {
            for (let user of users) {
                if (user.found) {
                    streamRequests.push(StreamService.getStream(user));
                }
                else {
                    this.userData.push(user);
                }
            }

            Promise.all(streamRequests).then(users => {
                this.ready = true;
                this.userData = this.userData.concat(users);
                this.userData.sort((a, b) => a.found ? a.online ? -1 : 1 : 1);
                this.showAll();
            });
        });
    }
};
</script>
