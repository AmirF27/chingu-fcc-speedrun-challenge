export default class Ajax {
    static resolveUrl(url, params) {
        let paramsKeys = Object.keys(params);
        // check if params were provided
        if (paramsKeys.length > 0) {
            url += "?";
            // attach params to the url
            for (let param of paramsKeys) {
                url += `${param}=${params[param]}`;
                // add a "&" as long as it's not the last param
                if (param !== paramsKeys[paramsKeys.length - 1]) {
                    url += "&";
                }
            }
        }

        return url;
    }

    static get(url, params = {}) {
        url = this.resolveUrl(url, params);

        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                    else {
                        reject(xhr.status);
                    }
                }
            };

            xhr.open("GET", url, true);
            // xhr.responseType = "json";
            xhr.send(null);
        });
    }
}
