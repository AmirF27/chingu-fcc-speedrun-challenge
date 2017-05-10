<template>
    <main class="container center-text">
        <p class="location">
            {{ location.city}}, {{ location.region }}, {{ location.country }}
        </p>
        <p class="weather">
            <img v-bind:src="weather.iconUrl" v-bind:alt="weather.description">
            <p>{{ weather.temp }}&deg;C</p>
            <p>{{ weather.description }}</p>
        </p>
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
                temp: "",
                description: "",
                iconUrl: ""
            }
        };
    },
    methods: {
        getLocationAndWeather() {
            Geo.getLocation(function(location) {
                ({
                    city: this.location.city,
                    region: this.location.region,
                    country: this.location.country
                } = location);

                Weather.getWeather(location.city, function(weather) {
                    ({
                        temp: this.weather.temp,
                        description: this.weather.description,
                        iconUrl: this.weather.iconUrl,
                    } = weather);
                }.bind(this));
            }.bind(this));
        }
    },
    created() {
        this.getLocationAndWeather();
    }
};
</script>
