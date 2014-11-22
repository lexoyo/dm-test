goog.provide('App');

goog.require('Article');
goog.require('Tag');


/**
 * @class
 */
class App {
  /**
   * @constructor
   */
  constructor() {
    /**
     * defines how many articles will be processed at once
     * @const
     */
    App.NUM_ITEMS_IN_BATCH = 10;

    /**
     * @type {Object.<Record>}
     */
    this.tags = {};

    /**
     * @type {Array.<Record>}
     */
    this.articles = [];
  }


  /**
   * @param {string} path
   */
  readArticles(path) {
    return this.load(path).then(this.buildArticles).then(this.resolveTags);
  }

  /**
   * @param {string} path
   */
  load(path) {
    // creates a promise to return immediately
    let Promise = require('es6-promise').Promise;
    let promise = new Promise((resolve, reject) => {
      // load the data and pass it to the next promise handler
      let fs = require('fs');
      fs.readFile(path, (err, buffer) => {
        if (err) {
          // pass an error to the error handler
          reject(Error(`Error while loading %{path} with error %{err}`));
        }
        else {
          // pass the data to the next promise handler
          resolve(buffer.toString());
        }
      });
    });
    return promise;
  }


  /**
   * @param {string} json string
   * @return {Object}
   */
  buildArticles(json) {
    // creates a promise to return immediately
    let Promise = require('es6-promise').Promise;
    let promise = new Promise((resolve, reject) => {
      // eval is much more efficient than JSON.parse
      // but a security whole
      let data = eval(json);
      // article to be created
      let articles = new Array();
      /**
       * run the generator until it is done
       * pause the process between each batch for a few ms
       */
      function runBatch(){
        let done = this.buildGenerator(data, App.NUM_ITEMS_IN_BATCH);
        if (done === false) {
          // the processing is not over, start again in a while
          setInterval(runBatch, 10);
        }
        else {
          // all articles have been handled
          resolve(articles);
        }
      }
      // start the process
      runBatch();
    });
    return promise;
  }
  /**
   * use a generator to build articles in batches
   * @param {Array.<Object>} data
   * @param {number} maxArticles
   * @return {Boolean}
   */
  *buildGenerator(data, maxArticles){
    for (let recordData of data) {
      // push it in the corresponding structure
      switch(recordData.type) {
      case Record.ARTICLE_TYPE:
        // build the article and its tags
        let record = new Article(recordData['id'], recordData['name'], recordData['tagRefs'] || []);
        this.articles.push(record);
        break;
      case Record.TAG_TYPE:
        let record = new Tag(recordData['id'], recordData['name'], recordData['tagRefs'] || []);
        Record.setTag(record.id.toString(), record);
        break;
      }
      // take a brake once in a while
      if (maxArticles--<=0) {
        maxArticles = (yield false);
      }
    }
    return true;
  }
  /**
   * @param {Array.<Record>} articles
   */
  resolveTags(articles) {
    // creates a promise to return immediately
    let Promise = require('es6-promise').Promise;
    let promise = new Promise((resolve, reject) => {
      /**
       * run the generator until it is done
       * pause the process between each batch for a few ms
       */
      function runBatch(){
        let done = this.resolveGenerator(articles, App.NUM_ITEMS_IN_BATCH);
        if (done === false) {
          // the processing is not over, start again in a while
          setInterval(runBatch, 10);
        }
        else {
          // all articles have been handled
          resolve(articles);
        }
      }
      // start the process
      runBatch();
    });
    return promise;
  }
  /**
   * use a generator to resolve tags in batches
   */
  *resolveGenerator(articles, maxTags){
    for (let article of articles) {
      // resolve the article tags
      article.resolveTags();
      // take a brake once in a while
      if (maxTags--<=0) {
        maxTags = (yield false);
      }
    };
    return true;
  }
}


let app = new App();
app.readArticles('./data.json').then(console.log, console.error);
