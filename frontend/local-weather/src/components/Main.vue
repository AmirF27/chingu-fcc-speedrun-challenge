<template>
    <main class="container center-text">
        <template v-if="ready">
            <h3>
                {{ location.city}}, {{ location.region }}, {{ location.country }}
            </h3>
            <p class="temp">
                {{ weather.temp.temp }}&deg;{{ weather.temp.scale }}
            </p>
            <img class="icon" v-bind:src="weather.iconUrl" v-bind:alt="weather.description">
            <p class="desc">{{ weather.description }}</p>
            <button v-on:click="toggleTempScale" class="btn btn--default">
                Toggle Temperature Scale
            </button>
        </template>
        <img v-else src="../assets/img/ajax-loader.gif" alt="Loading">
    </main>
</template>

<script>
import Geo from "../geo";
import Weather from "../weather";

export default {
    data() {
        return {
            location: {
                city: "",
                region: "",
                country: ""
            },
            weather: {
                temp: {},
                description: "",
                iconUrl: ""
            },
            ready: false
        };
    },
    methods: {
        getLocationAndWeather() {
            this.ready = false;
            let data = this;

            // get location first
            Geo.getLocation()
            .then(function fulfilled(location) {
                ({
                    city: data.location.city,
                    region: data.location.region,
                    country: data.location.country
                } = location);

                // once we have the location, get the weather
                return Weather.getWeather(location.city);
            }, function rejected(reason) {
                console.error(reason);
            })
            .then(function fulfilled(weather) {
                ({
                    temp: data.weather.temp,
                    description: data.weather.description,
                    iconUrl: data.weather.iconUrl,
                } = weather);

                data.ready = true;
            }, function rejected(reason) {
                console.error(reason);
            });
        },
        toggleTempScale() {
            this.weather.temp.toggleScale();
        }
    },
    created() {
        this.getLocationAndWeather();
    }
};
</script>
