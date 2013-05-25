var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , layoutModel = require('../../app/models/layout')
  , async = require('async')
  , util = require('util');

var PagesAdminController = new Controller();

PagesAdminController.admin = function() {
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ controller: 'admin', action: 'login' }));

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
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ controller: 'admin', action: 'login' }));

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
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ controller: 'admin', action: 'login' }));

  var _this = this;
  var errors = this._validateParams();

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

PagesAdminController.add = function() {
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ controller: 'admin', action: 'login' }));

  this.title = 'Adding New Page';
  this.render();
}


PagesAdminController.addSubmit = function() {
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ controller: 'admin', action: 'login' }));

  var _this = this;
  var errors = this._validateParams();

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

      layoutModel.addPage(data, function(err, rows) {
        callback(err, rows);
      });
    }
  ],function(err, results) {
    if (err) {
      _this.title = 'Could not add "' + _this.param('title') + '"';
      _this.content = {
        message: 'There was an error in saving this page! Perhaps the name is already used?',
        pageName: _this.param('name'),
        error: err
      };
      _this.render();
    } else {
      _this.title = 'Adding "' + _this.param('title') + '"';
      _this.content = {
        message: 'Successfully added page!',
        pageName: _this.param('name')
      };
      _this.render();
    }
  });
}

PagesAdminController._validateParams = function(callback) {
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ controller: 'admin', action: 'login' }));
  
  this.req.assert('name', 'ID Name cannot be empty').notEmpty();
  this.req.assert('name', 'ID Name must be alphabetic string').isAlpha();
  this.req.assert('name', 'ID Name must be all lower case').isLowercase();

  if (typeof this.param('pageName') != 'undefined' && this.param('pageName') == 'default') {
    this.req.assert('name', 'Cannot change default page name').equals('default');
  }

  this.req.assert('title', 'Title cannot be empty').notEmpty();

  return this.req.validationErrors();
}

module.exports = PagesAdminController;
