import Articles from '../articlesList/ArticlesList.js';
import './ChannelsList.css';

const url = 'https://newsapi.org/v2/';
const apiKey = '6e78c1ac891743f4a6d6fed43ec4225e';

export default class Channels {
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