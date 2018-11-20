"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var url = 'https://newsapi.org/v2/';
var apiKey = '6e78c1ac891743f4a6d6fed43ec4225e';
var newsContainer = document.querySelector('.news-grid');

var Articles =
/*#__PURE__*/
function () {
  function Articles(url, apiKey, sources) {
    _classCallCheck(this, Articles);

    this.url = url;
    this.apiKey = apiKey;
    this.sources = sources;
    this.requestParams = {
      pageSize: '10',
      apiKey: this.apiKey
    };
  }

  _createClass(Articles, [{
    key: "fetchNews",
    value: function () {
      var _fetchNews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var params, response, responseJson;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = "sources=".concat(this.sources, "&pageSize=").concat(this.requestParams.pageSize, "&apiKey=").concat(this.apiKey);
                _context.next = 3;
                return fetch("".concat(this.url, "everything?").concat(params));

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                responseJson = _context.sent;
                this.getMarkup(responseJson.articles);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchNews() {
        return _fetchNews.apply(this, arguments);
      };
    }()
  }, {
    key: "getMarkup",
    value: function getMarkup(news) {
      var tpl = news.map(function (item) {
        return "\n            <div class=\"article\">\n              <div class=\"article-item\">\n                <div class=\"article-image\" style=\"background-image: url('".concat(item.urlToImage, "')\"></div>\n                <a href=\"").concat(item.url, "\" target=\"_blank\" class=\"article-heading\">").concat(item.title, "</a>\n                <div class=\"article-content\">\n                  <p>").concat(item.description, "</p>\n                </div>\n              </div>\n            </div>\n          ");
      }).join('');
      this.render(tpl);
    }
  }, {
    key: "render",
    value: function render(template) {
      newsContainer.innerHTML = template;
    }
  }]);

  return Articles;
}();

var Channels =
/*#__PURE__*/
function () {
  function Channels(url, apiKey) {
    _classCallCheck(this, Channels);

    this.url = url;
    this.apiKey = apiKey;
  }

  _createClass(Channels, [{
    key: "fetchListData",
    value: function () {
      var _fetchListData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var res, resjson;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch("".concat(this.url, "sources?apiKey=").concat(this.apiKey));

              case 2:
                res = _context2.sent;
                _context2.next = 5;
                return res.json();

              case 5:
                resjson = _context2.sent;
                this.renderSourceControl('source-selector', resjson.sources);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchListData() {
        return _fetchListData.apply(this, arguments);
      };
    }()
  }, {
    key: "renderSourceControl",
    value: function renderSourceControl(container, options) {
      var dropdown = document.getElementById(container);
      var optionsSet = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;
          optionsSet += "<option value=\"".concat(value.id, "\">").concat(value.name, "</option>");
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      dropdown.innerHTML = optionsSet;
      this.addSourceHandler();
    }
  }, {
    key: "addSourceHandler",
    value: function addSourceHandler() {
      var element = document.getElementById('source-selector');
      element.addEventListener('change', function (e) {
        var updatedArticles = new Articles(url, apiKey, e.target.value);
        updatedArticles.fetchNews();
      });
    }
  }]);

  return Channels;
}();

var App =
/*#__PURE__*/
function () {
  function App(url, apiKey, source) {
    _classCallCheck(this, App);

    this.url = url;
    this.apiKey = apiKey;
    this.source = source;
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      var proba2 = new Channels(this.url, this.apiKey);
      proba2.fetchListData();
      var proba = new Articles(this.url, this.apiKey, this.source);
      proba.fetchNews();
    }
  }]);

  return App;
}();

var myApp = new App(url, apiKey, 'abc-news');
myApp.init();

var ArticlesList =
/*#__PURE__*/
function () {
  function ArticlesList(newsModel) {
    _classCallCheck(this, ArticlesList);

    this.newsModel = newsModel;
  }

  _createClass(ArticlesList, [{
    key: "showNews",
    value: function () {
      var _showNews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var news;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.newsModel.getNews();

              case 2:
                news = _context3.sent;
                this.displayArticles(news);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function showNews() {
        return _showNews.apply(this, arguments);
      };
    }()
  }, {
    key: "displayArticles",
    value: function displayArticles(articles) {
      var newsContainer = document.querySelector('.news-grid');
      var tpl = articles.map(function (item) {
        return "\n            <div class=\"article\">\n              <div class=\"article-item\">\n                <div class=\"article-image\" style=\"background-image: url('".concat(item.urlToImage, "')\"></div>\n                <a href=\"").concat(item.url, "\" target=\"_blank\" class=\"article-heading\">").concat(item.title, "</a>\n                <div class=\"article-content\">\n                  <p>").concat(item.description, "</p>\n                </div>\n              </div>\n            </div>\n          ");
      }).join('');
      newsContainer.innerHTML = tpl;
    }
  }]);

  return ArticlesList;
}();

var ChannelsList =
/*#__PURE__*/
function () {
  function ChannelsList(newsModel) {
    _classCallCheck(this, ChannelsList);

    this.newsModel = newsModel;
  }

  _createClass(ChannelsList, [{
    key: "showChannels",
    value: function () {
      var _showChannels = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var sources;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.newsModel.getSources();

              case 2:
                sources = _context4.sent;
                this.renderSourceControl('source-selector', sources);
                this.addSourceHandler();

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function showChannels() {
        return _showChannels.apply(this, arguments);
      };
    }()
  }, {
    key: "renderSourceControl",
    value: function renderSourceControl(container, options) {
      var dropdown = document.getElementById(container);
      var optionsSet = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var value = _step2.value;
          optionsSet += "<option value=\"".concat(value.id, "\">").concat(value.name, "</option>");
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      dropdown.innerHTML = optionsSet;
    }
  }, {
    key: "addSourceHandler",
    value: function addSourceHandler() {
      var _this = this;

      var element = document.getElementById('source-selector');
      element.addEventListener('change', function (e) {
        _this.newsModel.updateRequestParams('sources', e.target.value);

        _this.updateNews();
      });
    }
  }, {
    key: "updateNews",
    value: function () {
      var _updateNews = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var articlesList;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.newsModel.getNews();

              case 2:
                articlesList = new ArticlesList(newsModel);
                articlesList.showNews();

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function updateNews() {
        return _updateNews.apply(this, arguments);
      };
    }()
  }]);

  return ChannelsList;
}();
/* const newsModel = new NewsModel(url, apiKey, 'abc-news');
const renderChannelsList = new ChannelsList(newsModel);
const articlesList = new ArticlesList(newsModel);
renderChannelsList.showChannels();
articlesList.showNews() */
