import Ajax from "./ajax";

export default class StreamService {
    static getUserData(user) {
        return new Promise(function(resolve, reject) {
            let url = `https://wind-bow.gomix.me/twitch-api/users/${user}`;

            $.getJSON(url + "?callback=?", function(response) {
                resolve({
                    displayName: response.display_name,
                    name: response.name,
                    logo: response.logo
                });
            });
        });
    }

    static getStream(user) {
        return new Promise(function(resolve, reject) {
            let url = `https://wind-bow.gomix.me/twitch-api/streams/${user}`;

            $.getJSON(url + "?callback=?", function(response) {
                let status = {
                    online: !!response.stream
                };
                if (status.online) {
                    status.stream = response.stream.channel.status;
                }
                resolve(status);
            });
        });
    }
}
