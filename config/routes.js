var passport = require('passport');

module.exports = function routes() {
  this.root('pages#view');
  this.match('pages/:pageName', 'pages#view');

  this.resource('admin');
  this.match('login', 'admin#loginForm', { via: 'get' });
  this.match('login', 'admin#login', { via: 'post' });
  this.match('logout', 'admin#logout');

  this.match('admin/layout', 'layout#admin');

  this.match('admin/pages', 'pages_admin#admin');
  this.match('admin/pages/:pageName', 'pages_admin#edit', { via: 'get' } );
  this.match('admin/pages/:pageName', 'pages_admin#editSubmit', { via: 'post' } );

  this.match('admin/users', 'users#admin');

  this.match('notFound', 'pages#notFound');
}
