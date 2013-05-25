var express = require('express')
  , poweredBy = require('connect-powered-by')
  , util = require('util')
  , passport = require('passport');

module.exports = function() {
  // Warn of version mismatch between global "lcm" binary and local installation
  // of Locomotive.
  if (this.version !== require('locomotive').version) {
    console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
  }

  // Configure application settings.  Consult the Express API Reference for a
  // list of the available [settings](http://expressjs.com/api.html#app-settings).
  this.set('views', __dirname + '/../../app/views');
  this.set('view engine', 'jade');

  // Register EJS as a template engine.
  this.engine('jade', require('jade').__express);

  this.use(poweredBy('Locomotive'));
  this.use(express.logger());
  this.use(express.favicon());
  this.use(express.static(__dirname + '/../../public'));
  this.use(express.bodyParser());
  this.use(express.methodOverride());
  this.use(express.cookieParser("!"));
  this.use(express.session({
    //store: sessionStore,
    cookie: { maxAge : 3600000 } //1 Hour
    }));

  this.use(passport.initialize());
  this.use(passport.session());

  this.use(this.router);

  this.use(function(req, res, next) {
    res.send(404);
  });
}
