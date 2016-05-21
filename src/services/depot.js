
const fs = require('fs');
const nodegit = require('nodegit');
const Signature = nodegit.Signature;
const Project = require('../models/project');
const User = require('../models/user');
const Depot = require('./utils/Depot');
const CoreException = require('../result/exception');
const Success = require('../result/success');
const _ = require('../models/user');
const Promise = require('bluebird');
const config_json = require('../config.json');
let CONFIG = {};

if (config_json && config_json.manager && config_json.manager.git) {
  CONFIG = config_json.manager.git;
} else {
  console.log("Failed to load config from manager.properties.");
}


const DepotService = {

  createDepotAndInit: function (projectId, parentId, rootId, initMap) {
    // var depot = this._createDepot(projectId, parentId, rootId);
    return new Promise((resolve, reject) => {
      const promise = this._createDepot(projectId, parentId, rootId);
      promise.then((depot) => {
        if (!depot) return;
        depot.initRepo();

        const repo = depot.repo();
        Project.findOne({
          id: projectId
        }).then((project) => {
          User.findOne({
            id: project.owner_id
          }).then((user) => {
            const person =  Signature.now(user.name, user.email);
            const initRepoMap = _.assign({}, initMap);
            const fileMap = {};
            if (initRepoMap['readme'] == true) {
              fileMap['README.md'] = `#${project.name}\n`;
            }
            if (initRepoMap['gitignore'] !== 'no') {
              let gitignore;
              try {
                gitignore = fs.readFileSync(CONFIG['git.ignore_path'] + '/' + initRepoMap['gitignore'] + '.gitignore');
              } catch (e) {
                return reject(e);
              }
              fileMap['.gitignore'] = gitignore;
            }
            if (initRepoMap['license'] !== 'no') {
              let license;
              try {
                license = fs.readFileSync(CONFIG['git.license_path'] + '/' + initRepoMap['license'] + '.license');
              } catch (e) {
                return reject(e);
              }
              const date = new Date();
              license = license.replace(/\[year]/g, date.getFullYear())
                                .replace(/\[fullname]/g, user.name)
                                .replace(/\[project]/g, project.name);
            }
            if (!_.isEmpty(fileMap)) {
              // commit files

            }
            resolve(repo);
          });
        }).catch((error) => {
          reject(error);
        });
      });
    });
  },

  _createDepot: function (projectId, parentId, rootId) {
    const depot = new Depot();
    return new Promise((resolve, reject) => {
      Project.findOne({
        id: projectId
      }).then((project) => {
        if (!project) {
          console.log("create depot failed! because project is null!");
          return reject(null);
        }
        return User.findOne({
          id: project.owner_id
        });
      }).then((user) => {
        if (!user) {
          console.log("create depot failed! because project's owner is null!");
          reject(null);
        }
        const path = user.global_key + '/' + project.name;
        const _depot = {
          project_id: projectId,
          parent_id: parentId,
          path: path
        };
        _.assign(depot, _depot);
        return Depot.create(depot);
      }).then((newDepot) => {
        let _rootId;
        if (rootId <= 0) {
          _rootId = newDepot.id;
        } else {
          _rootId = rootId;
        }
        return Depot.update({
          rootId: _rootId
        }, {
          where: {
            id: newDepot.id
          }
        });
      }).then((depot) => {
        resolve(depot);
      }).catch((error) => {
        reject(error);
      });
    });
  }

};

