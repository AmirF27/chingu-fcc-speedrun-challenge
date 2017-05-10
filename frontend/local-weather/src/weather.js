import Ajax from "./ajax";

const C = "C";
const F = "F";

class Temp {
    constructor(temp, scale = C) {
        this.temp = temp;
        this.scale = scale;
    }

    toggleTempScale() {
        if (this.scale == C) {
            this.temp = Math.round(this.temp * 9/5 + 32);
            this.scale = F;
        }
        else {
            this.temp = Math.round((this.temp - 32) * 5/9);
            this.scale = C;
        }
    }
}

export default class Weather {
    constructor(temp, description, icon) {
        this.temp = temp;
        this.description = description;
        this.iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
    }

    static getWeather(city) {
        let url = `http://api.openweathermap.org/data/2.5/weather`,
            params = {
                q: city,
                APPID: "f2a9481460ad15f02543e1511c514374"
            };

        return new Promise(function(resolve, reject) {
            Ajax.get(url, params).then(
                function fulfilled(response) {
                    response = JSON.parse(response);
                    let temp = new Temp(Math.round(response.main.temp - 273.15));
                    resolve(new Weather(
                        temp,
                        response.weather[0].description,
                        response.weather[0].icon
                    ));
                },
                function rejected(reason) {
                    reject(reason);
                }
            );
        });
    }
}
