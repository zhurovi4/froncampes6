class NewsModel {
    constructor(apiKey) {
        this.url = 'https://newsapi.org/v2/';
        this.apiKey = apiKey;
        this.requestParams = {
            sources: 'abc-news',
            pageSize: '5',
            apiKey: this.apiKey
        };
    }
    getNews() {
        const params = Object.keys(this.requestParams).map((key) => `${key}=${this.requestParams[key]}`).join('&');
        return fetch(`${this.url}everything?${params}`)
        .then((res)=>res.json())
        .then((res)=>res.articles)
    }
    getSources() {
        return fetch(`${this.url}sources?apiKey=${this.apiKey}`)
        .then((res)=>res.json())
        .then((res)=>res.sources)
    }
    updateRequestParams(key, value) {
        this.requestParams[key] = value;
    }
}

class ArticlesList {
    constructor(newsModel) {
        this.newsModel = newsModel
    }
    showNews () {
        this.newsModel.getNews().then((articles) => {
            this.displayArticles(articles);
          });
      }
      displayArticles (articles) {
        const newsContainer = document.querySelector('.news-grid');
        const tpl = articles
          .map((item) => `
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
        newsContainer.innerHTML = tpl;
      }
}

class ChannelsList {
    constructor(newsModel) {
        this.newsModel = newsModel
    }
    showChannels() {
        this.newsModel.getSources().then((sources) => {
            this.renderSourceControl('source-selector', sources);
            this.addSourceHandler();
          });
    }

    renderSourceControl(container, options) {
        let dropdown = document.getElementById(container);
        let optionsSet = '';
        for (let value of options) {
            optionsSet += `<option value="${value.id}">${value.name}</option>`
          }
          dropdown.innerHTML = optionsSet;
      }

    addSourceHandler() {
        const element = document.getElementById('source-selector');
        element.addEventListener('change', (e) => {
                this.newsModel.updateRequestParams('sources', e.target.value);
                this.updateNews();
            })
    }

    updateNews () {
        this.newsModel.getNews().then((news) => {
            const articlesList = new ArticlesList(newsModel);
            articlesList.showNews();
        });
      }
  
}



const newsModel = new NewsModel('6e78c1ac891743f4a6d6fed43ec4225e');
const renderChannelsList = new ChannelsList(newsModel);
const articlesList = new ArticlesList(newsModel);
renderChannelsList.showChannels();
articlesList.showNews()






