var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , layoutModel = require('../../app/models/layout')
  , async = require('async')
  , util = require('util');

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
    _this.content = results;
    _this.render();
  });
}

PagesAdminController.edit = function() {
  var _this = this;

  async.waterfall([
    function(callback) {
      layoutModel.getPage(_this.param('pageName'), function(err, rows) {
        callback(err, rows);
      });
    }
  ],function(err, results) {
    console.log(results);
    _this.title = 'Editing "' + results.title + '"';
    _this.content = results;
    _this.render();
  });
}

PagesAdminController.editSubmit = function() {
  var _this = this;

  this.req.assert('name', 'ID Name cannot be empty').notEmpty();
  this.req.assert('name', 'ID Name must be alphabetic string').isAlpha();
  this.req.assert('name', 'ID Name must be all lower case').isLowercase();

  if (this.param('pageName') == 'default') {
    this.req.assert('name', 'Cannot change default page name').equals('default');
  }

  this.req.assert('title', 'Title cannot be empty').notEmpty();

  this.req.sanitize('name').xss();
  this.req.sanitize('title').xss();
  this.req.sanitize('content').xss();

  var errors = this.req.validationErrors();

  if (errors) {
    this.res.send('There have been validation errors: ' + util.inspect(errors), 500);
    return;
  }

  async.waterfall([
    function(callback) {
      data = {
        name: _this.param('name'),
        title: _this.param('title'),
        content: _this.param('content'),
      };

      layoutModel.savePage(_this.param('pageName'), data, function(err, rows) {
        callback(err, rows);
      });
    }
  ],function(err, results) {
    _this.title = 'Editing "' + _this.param('title') + '"';
    _this.content = {
      message: 'Successfully saved page!',
      pageName: _this.param('pageName')
    };
    _this.render();
  });
}

module.exports = PagesAdminController;
