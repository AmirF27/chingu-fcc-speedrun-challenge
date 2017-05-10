import Ajax from "./ajax";

export default class Geo {
    static getLocation(cb) {
        Ajax.get("http://ip-api.com/json").then(
            function fulfilled(response) {
                cb(JSON.parse(response));
            },
            function rejected(reason) {
                console.error(reason);
            }
        );
    }
}
