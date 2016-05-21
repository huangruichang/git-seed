
const RepoManager = require('./RepoManager');


class Depot {



  initRepo () {
    return new Promise((resolve, reject) => {
      RepoManager.me().createRepo(this.path);

    });
  }

  repo () {
    const thiz = this;
    return new Promise((resolve, reject) => {
      if (!thiz.repository) {
        RepoManager.me().getRepo(thiz.path).then((repository) => {
          thiz.repository = repository;
          resolve(repository);
        }).catch((error) => {
          reject(error);
        });
      } else {
        resolve(thiz.repository);
      }
    });

  }
}

module.exports = Depot;
