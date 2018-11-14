const url = 'https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=6e78c1ac891743f4a6d6fed43ec4225e';

/* fetch(url).then(response => response.json())
.then(data => console.log(data)); */


class NewsModel {
    constructor(url) {
        this.url = url;
        this.news = news
    }
    getNews() {
        fetch(url).then(response => response.json())
        .then(data => data.articles);
    }
}
const newsModel = new NewsModel(url);
class NewsView {
    constructor(element) {
        this.element = element;
    }
    render() {
        const news = newsModel.getNews(); //get all news and assign to news
        console.log(newsModel.getNews());
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '';
        for (let i = 0, len = news.length; i < len; i++) {
        let $li = document.createElement('li');
        $li.setAttribute('class', 'contact-list-item');
        $li.setAttribute('data-index', i);
        $li.innerHTML =`${new[i]['title']},${contacts[i]['author']}`; 
        newsList.append($li); 
        } 
    }

}

const newsView = new NewsView();


newsModel.getNews();
newsView.render()
