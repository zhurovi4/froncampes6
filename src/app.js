import 'whatwg-fetch';
import Articles from './js/components/articlesList/ArticlesList.js';
import Channels from './js/components/channelsList/ChannelsList.js';
const url = 'https://newsapi.org/v2/';
const apiKey = '6e78c1ac891743f4a6d6fed43ec4225e';

class App {
    constructor(url, apiKey, source) {
        this.url = url;
        this.apiKey = apiKey;
        this.source = source;
    }

    init() {
        const channels = new Channels(this.url, this.apiKey);
        channels.fetchListData();
        const articles = new Articles(this.url, this.apiKey, this.source);
        articles.fetchNews();
    }
}

const myApp = new App(url, apiKey, 'abc-news');
myApp.init();