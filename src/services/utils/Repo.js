"use strict";

var Promise = require('bluebird');
var EditTree = require('./EditTree');


var EMPTY_SHA = "0000000000000000000000000000000000000000";
class Repo {

    constructor (repo, path) {
        this.repo = repo;
        this.path = path;
        this.editTree = new EditTree(this);
    }

    getReposiotry () {
        return this.repo;
    }

    getPath () {
        return this.path;
    }

    getAbsolutePath () {
        return this.repo.path();
    }

    hasCommits () {
        return new Promise(function (resolve, reject) {
            this.getHeadRef().then(function (head) {
                if (!head) {
                    reject(false);
                }
                resolve(true);
            }).catch(function () {
                reject(false);
            });
        });
    }

    getHeadRef () {
        return this.repo.head();
    }

    getCommit (object_id) {
        return this.repo.getCommit(object_id);
    }

    getRef (name) {
        return this.repo.getReference(name);
    }

    getRefs (type) {
        return this.repo.getReferences(type);
    }


}

