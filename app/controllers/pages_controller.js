var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , layoutModel = require('../../app/models/layout')
  , async = require('async');

var PagesController = new Controller();

PagesController.view = function() {
  var _this = this;
  layoutModel.getPage(this.param('pageName'), function(err, row) {
    _this.title = row.title;
    _this.content = row.content;
    _this.render();
  });
}

module.exports = PagesController;
