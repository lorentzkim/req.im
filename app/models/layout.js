var async = require('async');

function Layout() {
  var db;
  this.name = 'pages';

  this.setDb = function(db) {
    this.db = db;
    var _this = this;

    if (this.createTable());
    this.tableExists(function(result) {
      if(!result) {
        _this.insertDefaultRecords();
      }
    });

    return;
  }

  this.getPage = function(pageName, callback) {
    if (typeof pageName == 'undefined') { pageName = 'default'; }

    this.db.get("SELECT * FROM " + this.name + " WHERE name = ?", [pageName], function(err, row) {
      if (typeof row == 'undefined') { callback(err); }
      callback(err, row);
    });
    return null;
  };

  this.getPages = function(callback) {
    if (typeof pageName == 'undefined') { pageName = 'default'; }

    this.db.all("SELECT * FROM " + this.name, function(err, rows) {
      if (typeof rows == 'undefined') { callback(err); }
      callback(err, rows);
    });
    return null;
  };

  /**** PROTECTED(?) ****/

  this.createTable = function() {
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS " + this.name + " \
      ( \
        id INTEGER PRIMARY KEY NOT NULL, \
        name TEXT NOT NULL, \
        title TEXT NOT NULL, \
        content TEXT NOT NULL \
      )"
    , function(err) {
      if (err != null) {
        return err;
      }
    });

    return true;
  }

  this.tableExists = function(callback) {
    this.db.get("SELECT id FROM " + this.name + " LIMIT 1", function(err, row) {
      if (typeof row == 'undefined') { callback(false) }
      callback(true);
    });
  }

  this.insertDefaultRecords = function() {
    this.db.run(
      "INSERT INTO " + this.name + " \
      (name, title, content) \
      VALUES \
      ('default', 'CMS for everyfolk', ?)"
    , ['req.im is a simple CMS designed for throwing up a quick website in node.js'], function(err) {
        if (err != null) {
          return err;
        }
      });

    return true;
  }
}

module.exports = new Layout;