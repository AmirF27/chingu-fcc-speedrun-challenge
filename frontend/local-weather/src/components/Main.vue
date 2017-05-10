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
            let data = {
                location: this.location,
                weather: this.weather
            };

            Geo.getLocation()
            .then(function fulfilled(location) {
                ({
                    city: data.location.city,
                    region: data.location.region,
                    country: data.location.country
                } = location);

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
            }, function rejected(reason) {
                console.error(reason);
            });
        }
    },
    created() {
        this.getLocationAndWeather();
    }
};
</script>
