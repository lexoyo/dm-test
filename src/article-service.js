goog.provide('ArticleService');

goog.require('Record');
goog.require('TagProcessor');
goog.require('ArticleProcessor');


/**
 * This class is the main class used to load the articles data
 * and then use the *Processor classes to create the hierarchy of articles and tags
 * @class
 */
class ArticleService {
  /**
   * @constructor
   */
  constructor() {
    /**
     * defines how many articles will be processed at once
     * @const
     */
    ArticleService.NUM_ITEMS_IN_BATCH = 2;
  }


  /**
   * @param {string} path
   */
  readArticles(path) {
    var articleProcessor = new ArticleProcessor();
    var tagProcessor = new TagProcessor();
    return this.load(path)
      .then(articleProcessor.buildArticles.bind(articleProcessor));
      // optional: resolve before we need the tags, uncomment this line:
      // .then(tagProcessor.resolveTags.bind(tagProcessor));
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
          reject(Error('Error while loading ' + path + ' with error ' + err));
        }
        else {
          // pass the data to the next promise handler
          resolve(buffer.toString());
        }
      });
    });
    return promise;
  }
}
