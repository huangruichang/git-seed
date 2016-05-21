"use strict";

class Commit {

  constructor (repo, sha, shortMessage, fullMessage, author, committer, commitDate, authorDate) {
    this.repo = repo;
    this.sha = sha;
    this.shortMessage = shortMessage;
    this.fullMessage = fullMessage;
    this.author = author;
    this.committer = committer;
    this.commitDate = commitDate;
    this.authorDate = authorDate;
  }

  

}
