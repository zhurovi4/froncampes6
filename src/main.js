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
    async getNews() {
        const params = Object.keys(this.requestParams).map((key) => `${key}=${this.requestParams[key]}`).join('&');
        const response = await fetch(`${this.url}everything?${params}`);
        const responseJson = await response.json();
        return responseJson.articles;
    }

    async getSources () {
        const response = await fetch(`${this.url}sources?apiKey=${this.apiKey}`);
        const responseJson = await response.json();
        return responseJson.sources;
      }

    updateRequestParams(key, value) {
        this.requestParams[key] = value;
    }
}

class ArticlesList {
    constructor(newsModel) {
        this.newsModel = newsModel
    }

      async showNews () {
        const news = await this.newsModel.getNews();
        this.displayArticles(news);
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

    async showChannels () {
        const sources  = await this.newsModel.getSources();
        this.renderSourceControl('source-selector', sources);
        this.addSourceHandler();
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

    async updateNews () {
        await this.newsModel.getNews();
        const articlesList = new ArticlesList(newsModel);
        articlesList.showNews();
      }
}



const newsModel = new NewsModel('6e78c1ac891743f4a6d6fed43ec4225e');
const renderChannelsList = new ChannelsList(newsModel);
const articlesList = new ArticlesList(newsModel);
renderChannelsList.showChannels();
articlesList.showNews()






