var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , layoutModel = require('../../app/models/layout')
  , async = require('async');

var PagesController = new Controller();

PagesController.view = function() {
  var _this = this;
  layoutModel.getPage(this.param('pageName'), function(err, row) {
    if (row == null) {
      return _this.res.redirect(_this.urlFor({ action: 'notFound' }));
    }
    _this.title = row.title;
    _this.content = row.content;
    _this.render();
  });
}

PagesController.notFound = function() {
  this.title = '404 - Page Not Found';
  this.render();
}

module.exports = PagesController;
