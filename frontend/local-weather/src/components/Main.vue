<template>
    <main class="container">
        <p class="location">{{ location }}</p>
    </main>
</template>

<script>
import Geo from "../geo";

export default {
    data() {
        return {
            location: {}
        };
    },
    methods: {
        getLocation() {
            Geo.getLocation(function(location) {
                this.location = `${location.city}, ${location.country}`;
            }.bind(this));
        }
    },
    created() {
        this.getLocation();
    }
};
</script>
