function Plugin() {
  var db;
  this.name = 'plugins';

  this.loadPlugin = function(pluginName) {
    this.db = db;
    var _this = this;
    return;
  }

  this.getPlugins = function(callback) {
    this.db.all("SELECT * FROM " + this.name, function(err, rows) {
      if (typeof rows == 'undefined') { callback(err); }
      callback(err, rows);
    });
    return null;
  };

  this.setDb = function(db) {
    this.db = db;
    var name = this.name;
    var _this = this;

    if (this.createTable());
    this.tableExists(function(result) {
      if(!result) {
        _this.insertDefaultRecords();
      }
    });

    return;
  }

  /**** PROTECTED(?) ****/

  this.createTable = function() {
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS " + this.name + " \
      ( \
        id INTEGER PRIMARY KEY NOT NULL, \
        name TEXT NOT NULL UNIQUE, \
        enabled INTEGER NOT NULL \
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
      (name, enabled) \
      VALUES \
      ('menu', 1)", function(err) {
        if (err != null) {
          return err;
        }
      });

    return true;
  }

}

module.exports = new Plugin;