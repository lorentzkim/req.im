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

  this.savePage = function(pageName, data, callback) {
    var replace = { $name: data.name, $title: data.title, $content: data.content, $pageName: pageName };

    this.db.run("UPDATE " + this.name + " \
      SET name = $name, title = $title, content = $content \
      WHERE name = $pageName", replace, function(err) {
        callback(err)
      });
  };

  this.addPage = function(data, callback) {
    var insert = { $name: data.name, $title: data.title, $content: data.content };

    this.db.run("INSERT INTO " + this.name + " \
      (name, title, content) \
      VALUES \
      ($name, $title, $content)", insert, function(err) {
        callback(err)
      });
  };

  /**** PROTECTED(?) ****/

  this.createTable = function() {
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS " + this.name + " \
      ( \
        id INTEGER PRIMARY KEY NOT NULL, \
        name TEXT NOT NULL UNIQUE, \
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