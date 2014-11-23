goog.provide('TagProcessor');

goog.require('Record');


/**
 * This class is used to resolve tags corresponding to a Record object
 * It uses an iterator generator in order not to freez the interpretor
 * @class
 */
class TagProcessor {

  /**
   * @constructor
   */
  constructor() {
  }


  /**
   * Resolve the tags which are referenced by articles
   * At this stage, the tags have tagRefs but no tags attributes
   * @param {Array.<Record>} articles
   */
  resolveTags(articles) {
    // creates a promise to return immediately
    let Promise = require('es6-promise').Promise;
    let promise = new Promise((resolve, reject) => {
      // create a generator iterator
      let iterator = this.resolveGenerator(articles, ArticleService.NUM_ITEMS_IN_BATCH);
      // start the process
      this.runResolveBatch(iterator, articles, resolve);
    });
    return promise;
  }


  /**
   * use a generator to resolve tags in batches
   * @param {Array.<Record>} articles
   * @param {number} maxArticles
   */
  *resolveGenerator(articles, maxArticles){
    let nextBatchIn = maxArticles;
    for (let article of articles) {
      // resolve the article tags
      article.resolveTags();
      console.log(article.toString());
      // take a brake once in a while
      if (nextBatchIn--<=0) {
        yield;
        nextBatchIn = maxArticles;
      }
    };
  }


  /**
   * run the generator until it is done
   * pause the process between each batch for a few ms
   * @param {*} iterator
   * @param {Array.<Record>} articles result of the build process
   * @param {function(Array.<Record>)} cbk
   */
  runResolveBatch(iterator, articles, cbk) {
    // process one batch of ArticleService.NUM_ITEMS_IN_BATCH items
    let res = iterator.next(articles, ArticleService.NUM_ITEMS_IN_BATCH);
    // check the result
    if (res.done === false) {
      // the processing is not over, start again in a while
      setTimeout(this.runResolveBatch.bind(this, iterator, articles, cbk), 10);
    }
    else {
      // all articles have been handled
      console.log('THE END.');
      cbk(articles);
    }
  }
}
