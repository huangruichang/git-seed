var CoreExcpetion = require('../result/exception');

var excluded = [
  '/api/login'
];

module.exports = function (req, res, next) {
  var path = req.originalUrl;
  if (excluded.indexOf(path.split('?')[0]) !== -1) {
    return next();
  }
  var user = req.session['currentUser'];
  if (!user) {
    console.log(path);
    if (path.indexOf('/api') !== -1) {
      return next(CoreExcpetion.of(CoreExcpetion.USER_NOT_LOGIN));
    } else {
      return res.redirect('/login?return_url=' + path);
    }
  }
  next();
};
