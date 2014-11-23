goog.provide('Record');


/**
 * This class holds an article or a tag data and has the methods to "resolve" its tags,
 * which means fill its tags array with Record instances,
 * accordingly to the ids in its tagRefs attribute
 * @class
 */
class Record {
  /**
   * @constructor
   * @param {number} id
   * @param {string} name
   * @param {string} type
   * @param {Array.<number>} tagRefs
   */
  constructor(id, name, type, tagRefs) {
    /**
     * @type {number}
     */
    this.id = id;

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {string}
     */
    this.type = type;

    /**
     * @type {Array.<number>}
     */
    this.tagRefs = tagRefs;

    /**
     * @private
     * @type {Array.<Record>|null}
     * will be null before all its tags have been computed
     */
    this.tags = null;

    /**
     * @type {Object.<Record>} tagsHash is a hash of tags
     * @static
     */
    Record.tagsHash = Record.tagsHash || {};
  }


  /**
   * this populates the static `tagsHash` object
   */
  static storeTag(record) {
    Record.tagsHash[record.id.toString()] = record;
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
      this.tagRefs.forEach((id) => {
        // reference the tag
        let tag = Record.tagsHash[id.toString()];
        console.log(tag.name, ' initialized');
        // add it to the record's tags
        this.tags.push(tag);
        // resolve child tags
        tag.resolveTags();
      });
    }
  }


  /**
   * method used to display Records
   */
  getTags() {
    // resolve before use if needed
    if (!this.tags) this.resolveTags();

    // flatten the hierarchy of tags
    return this.tags.reduce(function(collection, tag){
      return collection.concat(tag, tag.getTags());
    }, []);
  }


  /**
   * method used to display Records
   */
  toString() {
    if (this.type === 'article') {
      return this.name + ': ' + this.getTags().join(', ');
    }
    else {
      return this.name;
    }
  }
}
