
'use strict'

const fs = require('fs');
const path = require('path');
const nodegit = require('nodegit');
const Repository = nodegit.Repository;
const TreeBuilder = nodegit.Treebuilder;
const Commit = nodegit.Commit;
const Buf = nodegit.Buf;
const Blob = nodegit.Blob;
const Oid = nodegit.Oid;
const Odb = nodegit.Odb;
const Obj = nodegit.Object;
const Branch = nodegit.Branch;
const Signature = nodegit.Signature;
const Reference = nodegit.Reference;
const Packbuilder = nodegit.Packbuilder;
// var Constants = require('./constants');

const EMPTY_SHA = "0000000000000000000000000000000000000000";

class EditTree {
  constructor(repo) {
    this.repo = repo;
  }

  branchExisted (branchName) {
    const repo = this.repo;
    return new Promise((resolve, reject) => {
      Reference.lookup(repo, branchName).then((reference) => {
        resolve(reference);
      }).catch(() => {
        resolve(null);
      });
    });
  }



  commitFiles (branch, files, person, message) {
    var repo = this.repo;
    var branchName = branch;
    var headCommit;
    var treebuilder;
    var tree;

    if (!branchName.startsWith('refs/')) {
      branchName = 'refs/heads/' + branch;
    }

    const bPromise = this.branchExisted(branchName);

    return new Promise((resolve, reject) => {
      bPromise.then((reference) => {
        if (false) {
          repo.getBranchCommit(branchName)
            .then(function(commit) {
              headCommit = commit;
              return commit.getTree();
            })
            .then(function (t) {
              tree = t;
              return TreeBuilder.create(repo, tree);
            })
            .then(function (tb) {
              treebuilder = tb;

              let chain = undefined;
              for (let filePath in files) {
                const file = files[filePath];
                const buffer = new Buffer(file, 'UTF-8');
                const oid = Blob.createFromBuffer(repo, buffer, buffer.length);
                if (!chain) {
                  chain = treebuilder.insert(filePath, oid, 33188);
                } else {
                  chain = chain.then(() => {
                    return treebuilder.insert(filePath, oid, 33188);
                  });
                }
              }
              return chain;
            })
            .then(function () {
              var indexTreeId = treebuilder.write();
              return repo.createCommit(branchName, person, person, message, indexTreeId, [headCommit]);
            })
            .then(function (commitId) {
              console.log('New Commit: ', commitId.allocfmt());
              resolve(commitId);
            })
            .catch(function (err) {
              console.error(err);
              process.exit(1);
              reject(err);
            });
        } else {
          // repo.getTree(branchName).then((tree) => {
          //   console.log(tree);
          // }).catch((error) => {
          //   console.log(error);
          // });

          repo.odb().then((odb) => {
            return odb.write('fuck2', 'fuck2'.length, Obj.TYPE.BLOB);
          }).then((oid) => {
            console.log(oid);
            return repo.createCommit(branchName, person, person, message, oid, []);
          })
          .then(function (commitId) {
            console.log('New Commit: ', commitId.allocfmt());
            resolve(commitId);
          })
          .catch(function (err) {
            console.error(err);
            process.exit(1);
            //reject(err);
          });

          // repo.createBranch(branchName, '', false, person, 'fuck').then((reference) => {
          //   console.log(reference);
          // }).catch((error) => {
          //   console.log(error);
          // });

          // Reference.list(repo).then((array) => {
          //   console.log(array);
          // });

          // repo.openIndex((index) => {
          //   console.log(index);
          //   return index.writeTree();
          // }).then((oid) => {
          //   return repo.createCommit(branchName, person, person, message, oid, []);
          // }).then(function (commitId) {
          //   console.log('New Commit: ', commitId.allocfmt());
          //   resolve(commitId);
          // })
          // .catch(function (err) {
          //   console.error(err);
          //   process.exit(1);
          //   //reject(err);
          // });
        }
      });


    });


    // bPromise.then((reference) => {
    //   if (reference) {
    //
    //   }
    // });
    //
    // return repo.getBranchCommit(branchName)
    //   .then(function(commit) {
    //     headCommit = commit;
    //     return commit.getTree();
    //   })
    //   .then(function (t) {
    //     tree = t;
    //     return TreeBuilder.create(repo, tree);
    //   })
    //   .then(function (tb) {
    //     treebuilder = tb;
    //
    //     let chain = undefined;
    //     for (let path in files) {
    //       const file = files[path];
    //       const buffer = new Buffer(file, 'UTF-8');
    //       const oid = Blob.createFromBuffer(repo, buffer, buffer.length);
    //       if (!chain) {
    //         chain = treebuilder.insert(path, oid, 33188);
    //       } else {
    //         chain = chain.then(() => {
    //           return treebuilder.insert(path, oid, 33188);
    //         });
    //       }
    //     }
    //     return chain;
    //   })
    //   .then(function () {
    //     var indexTreeId = treebuilder.write();
    //     return repo.createCommit(branchName, person, person, message, indexTreeId, [headCommit]);
    //   })
    //   .then(function (commitId) {
    //     console.log('New Commit: ', commitId.allocfmt());
    //   })
    //   .catch(function (err) {
    //     console.error(err);
    //     process.exit(1);
    //   });
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

// var repo_path = '/Users/huangruichang/Desktop/testrepo.git';
var repo_path = '/Users/huangruichang/Desktop/testrepo';

Repository.open(repo_path).then(function (repository) {
  let editTree = new EditTree(repository);
  let person = Signature.now('huangruichang', '532079207@qq.com');
  let files = {
    'fucker1.txt': 'hello,fucker1',
    'fucker2.txt': 'hello fucker2',
    'fucker3.txt': 'hello fucker3'
  }
  return editTree.commitFiles('master', files, person, 'nice!')
    .finally(function() {
      console.log('commit complete');
      process.exit(0);
    });
});
