'use strict'

var nodegit = require('nodegit');
var Repository = nodegit.Repository;
var TreeBuilder = nodegit.Treebuilder;
var Commit = nodegit.Commit;
var Buf = nodegit.Buf;
var Blob = nodegit.Blob;
var Signature = nodegit.Signature;
var Packbuilder = nodegit.Packbuilder;

class EditTree {
  constructor(repo) {
    this.repo = repo;
  }

  commit(branch, path, content, person, message) {
    var repo = this.repo;
    var branchName = branch;
    var headCommit;
    var treebuilder;
    var tree;

    if (!branchName.startsWith('refs/')) {
      branchName = 'refs/heads/' + branch;
    }

    return repo.getBranchCommit(branchName)
      .then(function (commit) {
        headCommit = commit;
        return commit.getTree();
      })
      .then(function (t) {
        tree = t;
        return TreeBuilder.create(repo, tree);
      })
      .then(function (tb) {
        treebuilder = tb;
        var buffer = new Buffer(content, 'UTF-8');
        var oid = Blob.createFromBuffer(repo, buffer, buffer.length);

        return treebuilder.insert(path, oid, 33188);
      })
      .then(function () {
        var indexTreeId = treebuilder.write();
        return repo.createCommit(branchName, person, person, message, indexTreeId, [headCommit]);
      })
      .then(function (commitId) {
        console.log('New Commit: ', commitId.allocfmt());
      })
      .catch(function (err) {
        console.error(err);
        process.exit(1);
      });
  }
}

module.exports = EditTree;
