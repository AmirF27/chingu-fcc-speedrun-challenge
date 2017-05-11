import Ajax from "./ajax";

class Article {
    constructor(title, snippet, url) {
        this.title = title;
        this.snippet = snippet;
        this.url = url;
    }
}

export default class Viewer {
    static getArticles(searchTerm) {
        let url = "https://en.wikipedia.org/w/api.php",
            params = {
                action: "query",
            	format: "json",
                origin: "*",
            	prop: "info|extracts",
            	generator: "search",
            	inprop: "url",
            	exsentences: "1",
            	exlimit: "max",
            	exintro: 1,
            	explaintext: 1,
            	gsrsearch: searchTerm
            };

        return new Promise(function(resolve, reject) {
            Ajax.get(url, { params }).then(
                function fulfilled(response) {
                    response = JSON.parse(response);
                    var articles = [];
                    if (response.query) {
                        for (let key in response.query.pages) {
                            let val = response.query.pages[key];
                            articles.push(new Article(
                                val.title,
                                val.extract,
                                val.fullurl
                            ));
                        }
                    }
                    resolve(articles);
                },
                function rejected(reason) {
                    reject(reason);
                });
        });
    }
}
