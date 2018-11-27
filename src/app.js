import 'whatwg-fetch';

const url = 'https://newsapi.org/v2/';
const apiKey = '6e78c1ac891743f4a6d6fed43ec4225e';
const newsContainer = document.querySelector('.news-grid');

class Articles {
    constructor(url, apiKey, sources) {
        this.url = url;
        this.apiKey = apiKey;
        this.sources = sources;
        this.requestParams = {
            pageSize: '10',
            apiKey: this.apiKey
        };
    }
    async fetchNews() {
        const params = `sources=${this.sources}&pageSize=${this.requestParams.pageSize}&apiKey=${this.apiKey}`;
        const response = await fetch(`${this.url}everything?${params}`);
        const responseJson = await response.json();
        this.getMarkup(responseJson.articles);
    }

    getMarkup(news) {
        const tpl = news.map((item) => `
            <div class="article">
              <div class="article-item">
                <div class="article-image" style="background-image: url('${item.urlToImage}')"></div>
                <a href="${item.url}" target="_blank" class="article-heading">${item.title}</a>
                <div class="article-content">
                  <p>${item.description}</p>
                </div>
              </div>
            </div>
          `)
          .join('');
        this.render(tpl)
    }

    render(template) {
        newsContainer.innerHTML = template;
    }
}

class Channels {
    constructor(url, apiKey) {
        this.url = url;
        this.apiKey = apiKey;
    }

    async fetchListData () {
        const res = await fetch(`${this.url}sources?apiKey=${this.apiKey}`);
        const resjson = await res.json();
        this.renderSourceControl('source-selector', resjson.sources);
      }

    renderSourceControl(container, options) {
    let dropdown = document.getElementById(container);
    let optionsSet = '';
    for (let value of options) {
        optionsSet += `<option value="${value.id}">${value.name}</option>`
        }
        dropdown.innerHTML = optionsSet;
        this.addSourceHandler();
    }

    addSourceHandler() {
    const element = document.getElementById('source-selector');
    element.addEventListener('change', (e) => {
        const updatedArticles = new Articles(url, apiKey, e.target.value);
        updatedArticles.fetchNews();
        })
    }
}

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