export default class StreamService {
    static getUserData(user) {
        return new Promise(function(resolve, reject) {
            let url = `https://wind-bow.gomix.me/twitch-api/users/${user}`;

            $.getJSON(url + "?callback=?", function(response) {
                resolve({
                    displayName: response.display_name || `${user} (not found)`,
                    name: response.name || user,
                    logo: response.logo,
                    found: response.error ? false : true
                });
            });
        });
    }

    static getStream(user) {
        return new Promise(function(resolve, reject) {
            let url = `https://wind-bow.gomix.me/twitch-api/streams/${user.name}`;

            $.getJSON(url + "?callback=?", function(response) {
                let status = {
                    online: !!response.stream
                };
                if (status.online) {
                    status.stream = response.stream.channel.status;
                }
                resolve(Object.assign(user, status));
            });
        });
    }
}
