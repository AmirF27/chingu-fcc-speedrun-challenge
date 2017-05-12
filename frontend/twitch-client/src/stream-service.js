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

    static getStreams(user) {
        return new Promise(function(resolve, reject) {
            let url = `https://wind-bow.gomix.me/twitch-api/streams/${user}`;

            $.getJSON(url + "?callback=?", function(response) {
                let stream = {
                    online: !!response.stream
                };
                if (stream.online) {
                    stream.status = response.stream.channel.status;
                }
                resolve(stream);
            });
        });
    }
}
