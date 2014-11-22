"use strict";

// We have the following three object classes (Record, Tag, Article) defined :

// Each record has id, name and tags
function Record() {
  this.init(arguments);
}
Record.prototype = {
  init: function(id, name, tags) {
    this.id = id;
    this.name = name;
    this.tags = tags || [];
    if (this.onInit) {
      this.onInit();
    }
  },

  // List of tags, collected up to root of tags tree
  getTags: function() {
    return this.tags.reduce(function(collection, tag){
      return collection.concat(tag, tag.getTags());
    }, []);
  }
};


// Tags can have parent tags, creating a tree-like tags structure
function Tag(id, name, tags) {
  this.init(id, name, tags);
}
Tag.prototype = new Record();
Tag.prototype.toString = function() {
  return this.name;
};
Tag.prototype.onInit = function() {
  // Imagine there is some heavy calculation here, taking long time
  console.log('Tag ' + this.name + ' initialised');
};


// Articles can describe themself
function Article(id, name, tags) {
  this.init(id, name, tags);
}
Article.prototype = new Record();
Article.prototype.toString = function() {
  return this.name + ': ' + this.getTags().join(', ');
};


//
// Prepare a function, which will accept a data JSON URL and will call a callback function
// with an array of article objects present in the data file. This function should properly
// restore articles and tags relations.
//
// After calling the method with data.json
//
//   readArticles('./data.json', console.log);
//
// You should get in the console something similar to:
//
//   [ Six British soldiers missing: UK, Europe, War {...},
//   Burns hails Scottish fight fans: UK, Europe, Boxing, Sport {...},
//   Hello Poise: Culture {...} ]
//


function RecordFactory() {}

RecordFactory.prototype = {

  tagsCache:  {},
  tags:       {},
  articles:   [],

  prepare: function(records) {
    var self = this;
    records.forEach(function(record) {
      switch(record.type) {
        case 'tag':
          self.tags[record.id] = record;
          break;
        case 'article':
          self.articles.push(record);
          break;
      }
    });
  },

  create: function(record) {
    var tags = this.loadTags(record.tagRefs || []);

    switch(record.type) {
      case 'tag':
        if (this.tagsCache[record.id]) {
          return this.tagsCache[record.id];
        } else {
          return this.tagsCache[record.id] = new Tag(record.id, record.name, tags);
        }
      case 'article':
        return new Article(record.id, record.name, tags);
    }

  },

  loadTags: function(tagRefs) {
    var self = this;
    return tagRefs.reduce(function(collection, id){
      var record = self.tags[id];
      return collection.concat(self.create(record));
    }, []);
  }

};

// TODO : replace with desired implementation.
exports.RecordFactory = RecordFactory;
exports.Record = Record;
exports.Tag = Tag;
exports.Article = Article;
exports.Article = Article;
