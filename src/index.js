/**
 * this file is the entry point of the test
 */

goog.require('ArticleService');

// create the main service
let service = new ArticleService();

// start the loading of the articles
// this uses promise to chain events
// we cancould also pass console.log and console.error to the `then` method
// we could also use the `catch` method of the promise
service.readArticles(__dirname + '/data.json').then(
  function(articles) {
    // success
    console.log(articles.join('\n').toString())
  },
  function(err) {
    // error catched
    console.error('error', err)}
  );
