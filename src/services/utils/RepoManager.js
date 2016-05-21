"use strict";

const fs = require('fs');
const nodegit = require('nodegit');
const path = require('path');
const Repository = nodegit.Repository;
const Repo = require('./Repo');
const config_json = require('../../config.json');
const _ = require('underscore');
let CONFIG = {};

if (config_json && config_json.manager && config_json.manager.git) {
  CONFIG = config_json.manager.git;
} else {
  console.log("Failed to load config from manager.properties.");
}


const RepoManager = {
  init: () => {
    RepoManager.GIT_PATH = CONFIG['git_path'];
    RepoManager.ROOT_PATH = CONFIG['root_path'];
    RepoManager.UPDATE_HOOK_PATH = CONFIG['update_hook_path'];
    RepoManager.DELETED_PATH = CONFIG['repo_deleted_path'];
  },
  getProperty: (key) => {
    return CONFIG[key];
  },
  me: () => {
    return this;
  },
  getRootPath: () => {
    return this.ROOT_PATH;
  },
  error: () => {

  },
  info: () => {

  },
  getStoragePath: (p) => {
    const thiz = RepoManager.me();
    if (!p || p.indexOf('/') === -1) {
      console.log("%s: path is empty or doesn't contains a '/'!", p);
      return;
    }
    var parts = p.split('/');
    if (parts.length != 2 || parts[0].length < 3) {
      console.log("%s: at least 3 chars is required");
      return;
    }
    var fullPathName = p + '.git';
    return path.resolve(thiz.ROOT_PATH + '/', fullPathName);
  },
  getRepo: (path) => {
    const thiz = RepoManager.me();
    return new Promise((resolve, reject) => {
      const storagePath = thiz.getStoragePath(path);
      thiz.getRepository(storagePath).then((repository) => {
        resolve(new Repo(repository, path))
      }).catch((err) => {
        console.log(err);
      });
    });
  },
  getRepository: (path) => {
    return Repository.open(path);
  },
  createRepo: (path) => {
    const thiz = RepoManager.me();
    return new Promise((resolve, reject) => {
      thiz.createRepository(path).then((repository) => {
        resolve(new Repo(repository, path));
      }).catch((error) => {
        reject(error)
      });
    });
  },
  createRepository: (path) => {
    const thiz = RepoManager.me();
    return new Promise((resolve, reject) => {
      Repository.init(path, true).then((repository) => {
        thiz.createUpdateHook();
        resolve(repository);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  createUpdateHook(p) {
    const thiz = RepoManager.me();
    const updateHook = RepoManager.UPDATE_HOOK_PATH;
    let result;
    try {
      const repoPath = thiz.getStoragePath(p);
      const targetHookPath = path.resolve(repoPath, 'hooks', 'update');
      result = fs.symlinkSync(targetHookPath, updateHook);
    } catch (e) {
      return false;
    }
    return !!result;
  }
};


RepoManager.init();

module.exports = RepoManager;

