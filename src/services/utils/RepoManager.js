"use strict";

var fs = require('fs');
var nodegit = require('nodegit');
var path = require('path');
var Properties = require('./properties');
var config_json = require('../../config.json');
var _ = require('underscore');
var CONFIG = {};

if (config_json && config_json.manager && config_json.manager.git) {
    CONFIG = config_json.manager.git;
} else {
    console.log("Failed to load config from manager.properties.");
}


var RepoManager = {
    init: function () {
        RepoManager.GIT_PATH = CONFIG['git_path'];
        RepoManager.ROOT_PATH = CONFIG['root_path'];
        RepoManager.UPDATE_HOOK_PATH = CONFIG['update_hook_path'];
        RepoManager.DELETED_PATH = CONFIG['repo_deleted_path'];
    },
    getProperty: function (key) {
        return CONFIG[key];
    },
    me: function () {
        return this;
    },
    getRootPath: function () {
        return this.ROOT_PATH;
    },
    error: function () {

    },
    info: function () {

    },
    getStoragePath: function (p) {
        if (!p || p.indexOf('/') === -1) {
            console.log("%s: path is empty or doesn't contains a '/'!", p);
            return ;
        }
        var parts = p.split('/');
        if (parts.length != 2 || parts[0].length < 3) {
            console.log("%s: at least 3 chars is required");
            return ;
        }
        var fullPathName = p + '.git';
        return path.resolve(this.ROOT_PATH + '/', fullPathName);
    },
    getRepo: function () {
        return
    }
};


RepoManager.init();

module.exports = RepoManager;

