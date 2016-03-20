
var CoreException = require('../result/exception');
var Success = require('../result/success');
var _ = require('../models/user');
var Promise = require('bluebird');

var DepotService = {

    createDepotAndInit: function (project_id, parent_id, root_id, init_map) {
        var depot = this._creatDepot(project_id, parent_id, root_id);
        if (!depot) return ;
        depot.init
    },

    _creatDepot: function (project_id, parent_id, root_id) {
        
    }

};