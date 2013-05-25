var passport = require('passport');

module.exports = function routes() {
  this.root('pages#view');
  this.match('pages/:pageName', 'pages#view');
  this.match('notFound', 'pages#notFound');

  this.resource('admin');
  this.match('login', 'admin#loginForm', { via: 'get' });
  this.match('login', 'admin#login', { via: 'post' });
  this.match('logout', 'admin#logout');
}
