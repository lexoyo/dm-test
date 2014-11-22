goog.provide('Record');
goog.provide('Article');
goog.provide('Tag');


/**
 * @class
 */
class Record {
  /**
   * @constructor
   * @param {number} id
   * @param {string} name
   * @param {Array.<number>} tagRefs
   */
  constructor(id, name, tagRefs) {
    /**
     * @const
     */
    Record.ARTICLE_TYPE = 'article';
    /**
     * @const
     */
    Record.TAG_TYPE = 'tag';
    /**
     * @type {number}
     */
    this.id = id;

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {Array.<number>}
     */
    this.tagRefs = tagRefs;

    /**
     * @type {Array.<Record>|null}
     * will be null before all its tags have been computed
     */
    this.tags = null;

    /**
     * @type {Object.<Record>}
     * this is a hash where we store all resolved tags
     */
    Record.tagsHash = {};
  }


  /**
   * get / set a tag to / form the hash
   * @param {string} id
   * @return {Record} the tag stored in the hash
   */
  static getTag(id) {
    return Record.tagsHash[id];
  }

  /**
   * get / set a tag to / form the hash
   * @param {string} id
   * @param {Record} tag
   */
  static setTag(id, tag) {
    Record.tagsHash[id] = tag;
  }

  /**
   * resolve all tags
   * this populates the `tags` array with actual Record instances
   * the tagsHash hash must have been filled before calling this method
   */
  resolveTags() {
    if (!this.tags) {
      // init the tags object
      this.tags = [];
      // resolve each referenced tag
      this.tagRefs.forEach(function(id) {
        this.tag[id.toString()] = Record.getTag(id.toString());
        // resolve this child tag if needed
        this.tag[id].resolveTags();
      });
    }
  }
  getTags() {
    return this.tags.reduce(function(collection, tag){
      return collection.concat(tag, tag.getTags());
    }, []);
  }
  toString() {
    return this.name + ': ' + this.getTags().join(', ');
  }
}

/**
 * @class
 * @extends {Record}
 */
class Article extends Record {
  /**
   * @constructor
   * @param {number} id
   * @param {string} name
   * @param {Array.<number>} tagRefs
   */
  constructor(id, name, tagRefs) {
    Record.constructor(id, name, tagRefs);
  }
}

/**
 * @class
 * @extends {Record}
 */
class Tag extends Record {
  /**
   * @constructor
   * @param {number} id
   * @param {string} name
   * @param {Array.<number>} tagRefs
   */
  constructor(id, name, tagRefs) {
    Record.constructor(id, name, tagRefs);
  }
}
