var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , passport = require('passport');

var AdminController = new Controller();

AdminController.show = function() {
  this.title = 'req.im - Admin Management'

  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ action: 'login' }));

  this.user = this.req.user;
  this.render();
};

AdminController.new = function() {
	this.render();
}

AdminController.loginForm = function() {
  if (this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ action: 'show' }));

  this.title = 'req.im - Admin Login'
  this.render();
}

AdminController.login = function() {
  if (this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ action: 'show' }));

  passport.authenticate('local', {
    successRedirect: this.urlFor({ action: 'show' }),
    failureRedirect: this.urlFor({ action: 'login' }) }
  ) (this.__req, this.__res, this.__next);
}

AdminController.logout = function() {
  this.req.logout();
  this.redirect('/');
};

module.exports = AdminController;
