"use strict";

var fs = require('fs');
var Promise = require('bluebirds');
var readFile = Promise.promisify(fs.readFile);

class Properties {

  constructor() {
    this.key_set = {};
  }

  load(path) {
    return readFile(path);
  }

  keySet() {
    return this.key_set;
  }

}
