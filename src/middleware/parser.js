var _ = require('lodash');

module.exports = function (req, res, next) {

    var method = req.method;
    var query = req.query;

    if (method === 'GET') {
        var limit = undefined;
        if ('limit' in query) {
            limit = ~~query['limit'];
        }
        if ('pageSize' in query) {
            limit = ~~query['pageSize'];
        }
        query['limit'] = limit;

        var offset = undefined;
        var page = null;
        if ('offset' in query) {
            offset = ~~query['offset'];
        } else if ('page' in query) {
            page = Math.max(1, ~~query['page']);
            offset = Math.max(0, limit * (page - 1));
        }
        query['page'] = page;
        query['offset'] = offset;

        var orders = [];
        if ('orders' in query) {
            var arr = query['orders'];
            if (!_.isArray(arr)) {
                arr = [arr];
            }
            arr.forEach(function (key) {
                var order;
                if (key[0] === '-') {
                    key = key.substr(1);
                    order = [key, 'desc'];
                } else {
                    order = [key, 'asc'];
                }
                orders.push(order);
            });
        }
        orders.push(['id', 'desc']);
        query['orders'] = orders;
    }
    next();
};