var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , layoutModel = require('../../app/models/layout')
  , async = require('async')
  , fs = require('fs');

var LayoutController = new Controller();

LayoutController.admin = function() {
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ controller: 'admin', action: 'login' }));

  this.title = 'Layout / Template';
  this.content = {
    css: fs.readFileSync(this.app.get('stylesheet file'), 'utf8')
  };
  this.render();
}

LayoutController.adminSubmit = function() {
  fs.writeFileSync(this.app.get('stylesheet file'), this.param('stylesheet'), { encoding: 'utf8' });
  this.title = 'Successfully edited stylesheet!';
  this.content = {
    message: 'Remember that changes are visible only in the front end!',
  };
  this.render();
}

module.exports = LayoutController;
