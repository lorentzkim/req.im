var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , pluginModel = require('../../app/models/plugin')
  , async = require('async');

var PluginController = new Controller();

PluginController.admin = function() {
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ controller: 'admin', action: 'login' }));

  var _this = this;

  this.title = 'Plugins';
  this.content = '';

  async.waterfall([
    function(callback) {
      pluginModel.getPlugins(function(err, rows) {
        callback(err, rows);
      });
    }
  ],function(err, results) {
    _this.content = results;
    _this.render();
  });
}

module.exports = PluginController;
