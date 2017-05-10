import Ajax from "./ajax";

class Location {
    constructor(city, region, country) {
        this.city = city || "Unknown city";
        this.region = region || "Unknown region";
        this.country = country;
    }
}

export default class Geo {
    static getLocation(cb) {
        Ajax.get("http://ip-api.com/json").then(
            function fulfilled(response) {
                response = JSON.parse(response);
                cb(new Location(response.city, response.regionName, response.country));
            },
            function rejected(reason) {
                console.error(reason);
            }
        );
    }
}
