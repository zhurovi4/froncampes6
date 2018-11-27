import './ArticlesList.scss'
const newsContainer = document.querySelector('.news-grid');
export default class Articles {
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
