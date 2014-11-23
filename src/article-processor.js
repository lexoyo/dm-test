goog.provide('ArticleProcessor');

goog.require('Record');


/**
 * This class is used to build articles corresponding to a JSON object
 * It also references the tags with Record.storeTag static method,
 * so that the tag can be "resolved" later
 * This class uses an iterator generator in order not to freez the interpretor
 * @class
 */
class ArticleProcessor {


  /**
   * @constructor
   */
  constructor() {
  }


  /**
   * start processing and returns a promise
   * @param {string} json string
   * @return {Object}
   */
  buildArticles(json) {
    // creates a promise to return immediately
    let Promise = require('es6-promise').Promise;
    let promise = new Promise((resolve, reject) => {
      // eval is much more efficient than JSON.parse
      // but a security whole
      let data = /** @type {Array.<Object>} */ (eval(json));
      // article to be created
      let articles = new Array();
      // create a generator iterator
      let iterator = this.buildGenerator(data, articles, ArticleService.NUM_ITEMS_IN_BATCH);
      // start the process
      this.runBuildBatch(iterator, data, articles, resolve);
    });
    return promise;
  }


  /**
   * run the generator until it is done
   * pause the process between each batch for a few ms
   * @param {*} iterator
   * @param {Array.<Object>} data
   * @param {Array.<Record>} articles result of the build process
   * @param {function(Array.<Record>)} cbk
   */
  runBuildBatch(iterator, data, articles, cbk) {
    // process one batch of ArticleService.NUM_ITEMS_IN_BATCH items
    let res = iterator.next(data, articles, ArticleService.NUM_ITEMS_IN_BATCH);
    // check the result
    if (res.done === false) {
      // the processing is not over, start again in a while
      setTimeout(this.runBuildBatch.bind(this, iterator, data, articles, cbk), 10);
    }
    else {
      // all articles have been handled
      cbk(articles);
    }
  }


  /**
   * use a generator iterator to build articles in batches
   * @param {Array.<Object>} data
   * @param {Array.<Record>} articles result of the build process
   * @param {number} maxArticles
   */
  *buildGenerator(data, articles, maxArticles){
    let nextBatchIn = maxArticles;
    for (let recordData of data) {
      // build the article or tag
      let record = new Record(recordData['id'], recordData['name'], recordData['type'], recordData['tagRefs'] || []);
      if(recordData.type === 'article') {
        articles.push(record);
      }
      else {
        Record.storeTag(record);
      }
      // take a brake once in a while
      if (nextBatchIn--<=0) {
        yield;
        nextBatchIn = maxArticles;
      }
    }
  }
}
