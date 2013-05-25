var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , layoutModel = require('../../app/models/layout')
  , async = require('async');

var PagesAdminController = new Controller();

PagesAdminController.admin = function() {
  var _this = this;

  this.title = 'Page Configuration';

  async.waterfall([
    function(callback) {
      layoutModel.getPages(function(err, rows) {
        callback(err, rows);
      });
    }
  ],function(err, results) {
    console.log(results);
    _this.content = results;
    _this.render();
  });
}

module.exports = PagesAdminController;
