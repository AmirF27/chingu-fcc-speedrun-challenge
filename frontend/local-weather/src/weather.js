import Ajax from "./ajax";

export default class Weather {
    constructor(temp, description, icon) {
        this.temp = temp;
        this.description = description;
        this.iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    }

    static getWeather(city, cb) {
        let url = `http://api.openweathermap.org/data/2.5/weather`,
            params = {
                q: city,
                APPID: "f2a9481460ad15f02543e1511c514374"
            };
        Ajax.get(url, params).then(
            function fulfilled(response) {
                response = JSON.parse(response);
                cb(new Weather(
                    Math.round(response.main.temp - 273.15),
                    response.weather[0].description,
                    response.weather[0].icon
                ));
            },
            function rejected(reason) {
                console.error(reason);
            }
        );
    }
}
